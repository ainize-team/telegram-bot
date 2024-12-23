import dotenv from 'dotenv';
import { AzureOpenAI } from 'openai';
import TelegramBot from 'node-telegram-bot-api';

import { SYSTEM_PROMPT } from './constants';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const openai = new AzureOpenAI({
  baseURL: process.env.AZURE_OPENAI_ENDPOINT,
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: process.env.OPENAI_API_VERSION,
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  try {
    const resp = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
    });

    const botMessage = resp.choices[0].message.content;

    bot.sendMessage(chatId, botMessage);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
  }
});
