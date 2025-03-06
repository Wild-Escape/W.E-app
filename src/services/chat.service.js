import { createHttp } from "./base.service";

const http = createHttp(true);

export const createChatService = (userId) => http.post("/chats", { userId });

export const getChatService = (chatId) => http.get(`/chats/${chatId}`);

export const getChatsService = () => http.get("/chats");

export const sendMessageService = (chatId, text) => http.post(`/chats/messages/create`, { chatId, text });
