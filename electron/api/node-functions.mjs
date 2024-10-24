import { ipcMain } from "electron";
import { llmFunctions, llmState } from "./llama.mjs";

export function handleRunNodeCode() {
  ipcMain.on("run-node-code", async (event, data) => {
    const { func } = data;

    switch (func) {
      case "test":
        event.sender.send("node-code-response", {
          func: "test",
          message: "Función test ejecutada",
        });
        break;
      case "load-llama":
        try {
          console.log("Cargando Llama...");
          await llmFunctions.loadLlama();
          console.log("Llama cargada correctamente");

          event.sender.send("node-code-response", {
            func: "load-llama",
            ...llmState.state,
          });
        } catch (error) {
          event.sender.send(
            "node-code-response",
            `Error al cargar Llama: ${error.message}`
          );
        }
        break;
      case "load-model":
        const { path } = data;
        try {
          console.log("Cargando modelo...");
          await llmFunctions.loadModel(path);
          console.log("Modelo cargado correctamente");

          event.sender.send("node-code-response", {
            func: "load-model",
            ...llmState.state,
          });
        } catch (error) {
          event.sender.send(
            "node-code-response",
            `Error al cargar modelo: ${error.message}`
          );
        }
        break;
      case "create-chat-session":
        try {
          console.log("Creando sesión de chat...");
          await llmFunctions.createContext();
          await llmFunctions.createContextSequence();
          await llmFunctions.chatSession.createChatSession();
          console.log("Sesión de chat creada correctamente");

          event.sender.send("node-code-response", {
            func: "create-chat-session",
            ...llmState.state,
          });
        } catch (error) {
          event.sender.send(
            "node-code-response",
            `Error al crear sesión de chat: ${error.message}`
          );
        }
        break;
      case "send-message":
        const { message } = data;
        try {
          console.log("Enviando mensaje...");
          const res = await llmFunctions.chatSession.prompt(message);
          console.log("Mensaje enviado correctamente: ", res);

          event.sender.send("node-code-response", {
            func: "send-message",
            ...llmState.state,
          });
        } catch (error) {
          event.sender.send(
            "node-code-response",
            `Error al enviar mensaje: ${error.message}`
          );
        }
        break;
      default:
        event.sender.send("node-code-response", "Función no encontrada");
    }
  });
}
