import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import path from "path";

let mongoServer;
let client;
let db;

// Función para iniciar MongoDB automáticamente
export async function startMongoServer() {
  try {
    mongoServer = await MongoMemoryServer.create({
      instance: {
        dbPath: path.resolve("db"), // Carpeta donde se guardará la base de datos
        storageEngine: "wiredTiger", // Motor de almacenamiento persistente
      },
    });

    const uri = mongoServer.getUri();

    client = new MongoClient(uri);
    await client.connect();
    db = client.db("chatDB");

    console.log("MongoDB iniciado en:", uri);
  } catch (error) {
    console.error("Error al iniciar MongoDB:", error);
    throw error;
  }
}

// Función para crear un nuevo chat
export async function newChat() {
  const id = uuidv4();
  const chat = { id, messages: [], createdAt: new Date() };

  const chatsCollection = db.collection("chats");
  await chatsCollection.insertOne(chat);

  return id;
}

// Función para añadir un mensaje a un chat existente
export async function addMessageToChat(chatId, messageContent, messageType) {
  const chatsCollection = db.collection("chats");

  const newMessage = {
    message: messageContent,
    type: messageType, // Ejemplo: "model", "user" u otro valor
    date: new Date(),
  };

  const result = await chatsCollection.updateOne(
    { id: chatId },
    {
      $push: { messages: newMessage },
    }
  );

  if (result.matchedCount === 0) {
    throw new Error("Chat no encontrado");
  }
}

// Función para reemplazar todos los mensajes de un chat
export async function replaceMessages(chatId, newMessages) {
  const chatsCollection = db.collection("chats");

  // Validar que los mensajes tienen la estructura adecuada
  const validMessages = newMessages.map((msg) => ({
    message: msg.message,
    type: msg.type,
    date: msg.date || new Date(),
  }));

  const result = await chatsCollection.updateOne(
    { id: chatId },
    {
      $set: { messages: validMessages },
    }
  );

  if (result.matchedCount === 0) {
    throw new Error("Chat no encontrado");
  }
}

// Función para obtener un chat por su ID
export async function getChat(chatId) {
  const chatsCollection = db.collection("chats");
  return await chatsCollection.findOne({ id: chatId });
}

// Función para eliminar un chat por su ID
export async function deleteChat(chatId) {
  const chatsCollection = db.collection("chats");
  await chatsCollection.deleteOne({ id: chatId });
}

// Cierra MongoDB al terminar
export async function stopMongoServer() {
  await client.close();
  await mongoServer.stop();
  console.log("MongoDB detenido");
}
