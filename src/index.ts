import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import Ainize from "@ainize-team/ainize-js";

import { MODEL_NAME } from "./constants";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const ainize = new Ainize(1);
const privateKey = process.env.AIN_PRIVATE_KEY || Ainize.createAinAccount().private_key;
ainize.login(privateKey);

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;
  try {
    const model = await ainize.getModel(MODEL_NAME);
    const response = await model.request({ prompt: userMessage });
    if (response.status !== 'SUCCESS') {
      throw new Error(`Failed to get response from model: ${response.status}`);
    }
    const botMessage = response.data;
    bot.sendMessage(chatId, botMessage);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Unknown error. Please try again.");
  }
});
