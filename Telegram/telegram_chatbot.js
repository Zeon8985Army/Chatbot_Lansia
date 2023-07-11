process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const TelegramBot = require('node-telegram-bot-api');

// Replace YOUR_TOKEN with your Telegram bot token obtained from BotFather
const token = '6288221105:AAGcMyLx_2O5oJFs-sv6X97kcAoclPxoQgc';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (message) => {
  const chatId = message.chat.id;
  bot.sendMessage(chatId, `You said: ${message.text}`);
});

bot.onText(/\/start/, (message) => {
  const chatId = message.chat.id;
  bot.sendMessage(chatId, 'Hello! I am ready to receive messages from BotFather.');
});