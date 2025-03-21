import { StateGraph, END, START, MessagesAnnotation, MemorySaver } from '@langchain/langgraph';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatLlamaCpp } from '@langchain/community/chat_models/llama_cpp';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';
import { trimMessages } from '@langchain/core/messages';

let model = null;
export let configuration = null;
let trimmer = trimMessages({
  maxTokens: configuration?.maxTokens || 1024,
  strategy: 'last',
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: 'human',
});

export const loadModel = async (config) => {
  configuration = config;
  model = await ChatLlamaCpp.initialize(config);
  trimmer = trimMessages({
    maxTokens: configuration?.maxTokens || 1024,
    strategy: 'last',
    tokenCounter: (msgs) => msgs.length,
    includeSystem: true,
    allowPartial: false,
    startOn: 'human',
  });
};

/*let placeholder = `{{- bos_token }}
{%- set date_string = strftime_now('%d %b %Y') %}

{#- This block extracts the system message, so we can slot it into the right place. #}
{%- if messages[0]['role'] == 'system' %}
    {%- set system_message = messages[0]['content'] | trim %}
    {%- set loop_start = 1 %}
{%- else %}
    {%- set system_message = '' %}
    {%- set loop_start = 0 %}
{%- endif %}

{#- System message #}
{{- '<|start_header_id|>system<|end_header_id|>\n\n' }}
{{- 'Cutting Knowledge Date: December 2023\n' }}
{{- 'Today Date: ' + date_string + '\n\n' }}
{{- system_message }}
{{- '<|eot_id|>' }}

{%- for message in messages %}
    {%- if loop.index0 >= loop_start %}
        {{- '<|start_header_id|>' + message['role'] + '<|end_header_id|>\n\n' + message['content'] | trim + '<|eot_id|>' }}
    {%- endif %}
{%- endfor %}
{%- if add_generation_prompt %}
    {{- '<|start_header_id|>assistant<|end_header_id|>\n\n' }}
{%- endif %}`;*/
const placeholder = `{messages}`;

let promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'Eres un asistente amable. Responde siempre de manera concisa.'],
  ['placeholder', placeholder],
]);

export const changePromptTemplate = async (prompt) => {
  promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', prompt],
    ['placeholder', placeholder],
  ]);
};

const callModel = async (state) => {
  try {
    if (model === null) {
      throw new Error('Model not loaded');
    }

    if (model._context.sequencesLeft === 0) {
      model._context = await model._model.createContext({
        contextSize: configuration.contextSize || 1024,
        batchSize: configuration.batchSize || 128,
        threads: configuration.threads || 4,
      });
    }

    const trimmedMessage = await trimmer.invoke(state.messages);
    const prompt = await promptTemplate.invoke({ messages: trimmedMessage });
    const response = await model.invoke(prompt, {
      onToken: async (token) => {
        const detokenized = model._model.tokenizer.detokenize(token);
        await dispatchCustomEvent('onTextChunk', detokenized);
      },
    });

    return { messages: [response] };
  } catch (error) {
    return { messages: [{ type: 'system', text: error.toString() }] };
  }
};

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('model', callModel)
  .addEdge(START, 'model')
  .addEdge('model', END);

export const app = workflow.compile({ checkpointer: new MemorySaver() });
