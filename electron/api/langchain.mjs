import {
  StateGraph,
  END,
  START,
  MessagesAnnotation,
  MemorySaver,
} from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatLlamaCpp } from "@langchain/community/chat_models/llama_cpp";

let model = null;
export let modelPath = null;
export const loadModel = async (path) => {
  modelPath = path;
  model = await ChatLlamaCpp.initialize({
    modelPath: modelPath,
    contextSize: 2048,
  });
};

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["placeholder", "{messages}"],
]);

const callModel = async (state) => {
  if (model === null) {
    throw new Error("Model not loaded");
  }

  if (model._context.sequencesLeft === 0) {
    model._context = await model._model.createContext({
      contextSize: 2048,
    });
  }

  const prompt = await promptTemplate.invoke(state);
  const response = await model.invoke(prompt);
  return { messages: [response] };
};

const callModelWithStreaming = async (state) => {
  if (model === null) {
    throw new Error("Model not loaded");
  }

  if (model._context.sequencesLeft === 0) {
    model._context = await model._model.createContext({
      contextSize: 2048,
    });
  }

  const prompt = await promptTemplate.invoke(state);

  // Usar el método de streaming
  const stream = await model.stream(prompt);

  // Recoger y devolver el resultado del stream
  const messages = [];
  for await (const chunk of stream) {
    console.log(chunk.content); // Mostrar cada fragmento de respuesta
    messages.push(chunk.content);
  }

  return { messages };
};

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

export const app = workflow.compile({ checkpointer: new MemorySaver() });

/*const test = async () => {
  await loadModel("C:\\Users\\adri2\\Desktop\\model.gguf");
  const input = {
    messages: [new HumanMessage("My name is Adrian")],
  };
  const config = { configurable: { thread_id: uuidv4() } };
  const output = await app.invoke(input, config);
  console.log(output.messages[output.messages.length - 1]);

  const input2 = {
    messages: [new HumanMessage("Whats my name?")],
  };
  const output2 = await app.invoke(input2, config);
  console.log(output2.messages[output2.messages.length - 1]);
};
test();*/
