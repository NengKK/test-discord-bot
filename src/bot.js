require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const COMMAND_PREFIX = '$';
const COMMON_ERROR_MESSAGE = 'Something went wrong! Please check UserID or contact administrator';

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
        if (!message.member.hasPermission('KICK_MEMBERS'))
          return message.reply('You don\'t have permission to use that command. 😏');
        if (args.length === 0)
          return message.reply('Please provide an user ID!');

        message.guild.members.fetch(args[0])
          .then((member) => {
            if (member.kickable) {
              member
                .kick()
                .then(member => message.channel.send(`${member} was kicked! 😤`))
                .catch(() => message.channel.send('I cannot kick that user 😓'));
            } else {
              message.reply(`Cannot kick given user!`);
            }
          })
          .catch((ex) => {
            console.error(ex);
            message.reply(COMMON_ERROR_MESSAGE);
          });

        return;
      case 'ban':
        if (!message.member.hasPermission('BAN_MEMBERS'))
          return message.reply('You don\'t have permission to use that command. 😏');
        if (args.length === 0)
          return message.reply('Please provide an user ID!');

        message.guild.members.fetch(args[0])
          .then(member => {
            if (!member.bannable) return message.reply('Cannot ban given user!');

            member.ban()
              .then(member => message.channel.send(`${member} was banned!`))
              .catch(ex => {
                console.error(ex);
                message.channel.send('I cannot ban that user');
              });
          })
          .catch((ex) => {
            console.error(ex);
            message.reply(COMMON_ERROR_MESSAGE);
          });

        return;
      default:
        message.reply(`${CMD_NAME} command not found!`);
        return;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);