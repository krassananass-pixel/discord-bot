const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

// Damit Railway den Bot als Webservice erkennt
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Bot online als ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  if (content.includes('mali')) {
    message.reply('yes, mali is tuff.');
  }
  if (content.includes('scam') || content.includes('solo kings')) {
    message.reply('scam Kings?');
  }
});

client.login(process.env.TOKEN);
