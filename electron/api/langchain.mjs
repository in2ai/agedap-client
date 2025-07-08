import { StateGraph, END, START, MessagesAnnotation, MemorySaver } from '@langchain/langgraph';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatLlamaCpp } from '@langchain/community/chat_models/llama_cpp';
import { ChatTogetherAI } from '@langchain/community/chat_models/togetherai';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';
import { AIMessage, trimMessages } from '@langchain/core/messages';
//const TOGETHER_AI_API_KEY = '9f78984abf4a8e3c77f87e3633ae8b982be1c37919a8113019e7103037620038';
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
  if (configuration.togetherAI) {
    model = new ChatTogetherAI({
      model: configuration.modelName,
      apiKey: configuration.togetherApiKey,
    });
  } else {
    model = await ChatLlamaCpp.initialize(config);
  }
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
    console.log('Calling model with state:', state);

    if (!configuration.togetherAI && model._context.sequencesLeft === 0) {
      model._context = await model._model.createContext({
        contextSize: configuration.contextSize || 1024,
        batchSize: configuration.batchSize || 128,
        threads: configuration.threads || 4,
      });
    }

    const trimmedMessage = await trimmer.invoke(state.messages);
    const prompt = await promptTemplate.invoke({ messages: trimmedMessage });

    if (!configuration.togetherAI) {
      const response = await model.invoke(prompt, {
        onToken: async (token) => {
          console.log('Token received:', token);
          const detokenized = model._model.tokenizer.detokenize(token);
          await dispatchCustomEvent('onTextChunk', detokenized);
        },
      });
      return { messages: [response] };
    } else {
      let currentMessage = '';
      const response = await model.stream(prompt);
      for await (const chunk of response) {
        console.log('Chunk received:', chunk);
        currentMessage += chunk.content;
        await dispatchCustomEvent('onTextChunk', chunk.content);
      }
      console.log('Model response:', response);
      return {
        messages: [new AIMessage(currentMessage)],
      };
    }
  } catch (error) {
    console.error('Error in callModel:', error);
    return { messages: [{ type: 'system', text: error.toString() }] };
  }
};

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('model', callModel)
  .addEdge(START, 'model')
  .addEdge('model', END);

export const app = workflow.compile({ checkpointer: new MemorySaver() });
