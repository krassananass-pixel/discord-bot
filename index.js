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


function checkSleepTime() {
  const now = new Date();

  // UTC +2 = deutsche Zeit (Sommerzeit)
  const hour = now.getUTCHours() + 2;
  const minutes = now.getUTCMinutes();

  const inSleepWindow =
    (hour > 0 && hour < 8) || (hour === 0 && minutes >= 40);

  if (inSleepWindow) {
    console.log('🛌 Sleep-Zeit: Bot fährt herunter');
    client.destroy(); // trennt den Bot
  } else if (!client.isReady()) {
    console.log('☀️ Wake-Up-Zeit: Bot startet wieder');
    client.login(process.env.TOKEN);
  }
}

// checke alle 5 Minuten
setInterval(checkSleepTime, 5 * 60 * 1000);

// erster Start:
checkSleepTime();
