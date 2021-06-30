require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const COMMAND_PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.username} is ready!!`);
});

client.on('message', (message) => {
  let sender = message.author;
  console.log(`[${sender.tag}]: ${message.content}`);

  if (message.author.bot) return;

  if (message.content.startsWith(COMMAND_PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(COMMAND_PREFIX.length)
      .split(/\s+/);

    switch (CMD_NAME.toLowerCase()) {
      case 'kick':
        if (args.length === 0) return message.reply('Please provide an user ID!');
        
        message.guild.members.fetch(args[0])
          .then((member) => {
            if (member.kickable) {
              member.kick();
            } else {
              message.reply(`Cannot kick given user!`);
            }
          })
          .catch((ex) => {
            console.error(ex);
            message.reply(`Something went wrong! Please check UserID or contact administrator`);
          });

        return;
      case 'ban':
        message.reply(`BAN command is under construction!`)
        // if (args.length === 0) return message.reply('Please provide an user ID!');
        // message.channel.send(`Banned user: ${args[0]}`);
        return;
      default:
        message.reply(`${CMD_NAME} command not found!`);
        return;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);