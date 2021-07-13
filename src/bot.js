require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const COMMAND_PREFIX = '$';
const COMMON_ERROR_MESSAGE = 'Something went wrong! Please check UserID or contact administrator';
const NO_PERMISSION_MESSAGE = `You don't have permission to use that command. 😏`;

client.on('ready', () => {
  console.log(`${client.user.username} is ready!!`);
});

client.on('message', async (message) => {
  let sender = message.author;
  console.log(`[${sender.tag}]: ${message.content}`);

  if (message.author.bot) return;

  if (message.content.startsWith(COMMAND_PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(COMMAND_PREFIX.length)
      .split(/\s+/);

    if (args.length === 0)
      return message.reply('Please provide an user ID!');

    let member;

    try {
      member = await message.guild.members.fetch(args[0]);
    } catch (ex) {
      console.error(ex);
      message.reply(COMMON_ERROR_MESSAGE);
    }

    if (!member) return;

    switch (CMD_NAME.toLowerCase()) {
      case 'kick':
        if (!message.member.hasPermission('KICK_MEMBERS'))
          return message.reply(NO_PERMISSION_MESSAGE);
        if (!member.kickable)
          return message.reply(`Cannot kick given user!`);

        try {
          let kickMember = await member.kick();
          message.channel.send(`${kickMember} was kicked! 😤`)
        } catch (ex) {
          console.error(ex);
          message.channel.send('I cannot kick that user 😓');
        }

        return;
      case 'ban':
        if (!message.member.hasPermission('BAN_MEMBERS'))
          return message.reply(NO_PERMISSION_MESSAGE);
        if (!member.bannable)
          return message.reply('Cannot ban given user!');

        try {
          let banMember = await member.ban();
          message.channel.send(`${banMember} was banned! 😤`)
        } catch (ex) {
          console.error(ex);
          message.channel.send('I cannot ban that user 😓');
        }

        return;
      default:
        message.reply(`${CMD_NAME} command not found!`);
        return;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);