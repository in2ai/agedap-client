import {
  startMongoServer,
  newChat,
  addMessageToChat,
  replaceMessages,
  getChat,
  stopMongoServer,
} from "./chat.js";

(async () => {
  try {
    await startMongoServer();

    // Crear un nuevo chat
    const chatId = await newChat();
    console.log("Nuevo chat creado con ID:", chatId);

    // Añadir mensajes al chat
    await addMessageToChat(chatId, "Hola, soy el modelo.", "model");
    await addMessageToChat(chatId, "Hola, soy el usuario.", "user");

    // Reemplazar los mensajes con un nuevo conjunto
    const newMessages = [
      { message: "Mensaje nuevo 1", type: "model" },
      { message: "Mensaje nuevo 2", type: "user" },
    ];
    await replaceMessages(chatId, newMessages);

    // Obtener el chat completo después del reemplazo
    const updatedChat = await getChat(chatId);
    console.log("Contenido del chat actualizado:", updatedChat);

    // Detener MongoDB al finalizar
    await stopMongoServer();
  } catch (error) {
    console.error("Error en la aplicación:", error);
  }
})();
