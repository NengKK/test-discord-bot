require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log(`${client.user.username} is ready!!`);
});

client.on('message', (message) => {
  let sender = message.author;
  console.log(`Get message from user: ${sender.username}`);
  
  if (sender.id !== client.user.id) {
    let channel = message.channel;
    channel.send(message.content)
      .then((message) => console.log(`Sent message back: ${message.content}`))
      .catch((ex) => console.error(ex));
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);