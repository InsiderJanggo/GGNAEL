const Discord = require('discord.js');
const client = new Discord.Client();
const setting = require('./setting.json');

var version = 1.0;

var PREFIX = '/';

client.on('ready', () => {
    console.log("Bot Version " + version + " Is Online");
    // Set the client user's activity
    client.user.setActivity('/ | For Money', { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
})


client.on('message', message => {
     // If the message is "/avatar"
  if (message.content === '/avatar') {
    // Send the user's avatar URL
    message.reply(message.author.displayAvatarURL());
  }
  let args = message.content.substring(PREFIX.length).split(" ");
  switch(args[0]) {
    case 'menu':
        const menuEmbed = new Discord.MessageEmbed()
        .setColor('#0cc2f5')
        .setAuthor('JW#0002', 'https://images.discordapp.net/avatars/332109764286742529/a_09a8cbe04bb152c0576f49ae3f469699.png?size=512', 'https://top.gg/user/332109764286742529')
        .setDescription('GGNAEL Menu : ')
        .addField('/kick', 'Kick Member', true)
        .addField('/ban', 'Ban Member', true)
        .addField('/avatar', 'Show Your Profile Avatar', true)
        .setTimestamp()
        .setFooter('GGNAEL MENU', 'https://cdn.discordapp.com/app-icons/708512532628897843/84172d129d65e16089d2ccf21f51458e.png?size=64')
        message.channel.send(menuEmbed);
        break;
  }
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('/kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Berhasil menendang ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('Saya tidak dapat menendang anggota');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("Pengguna itu tidak ada di group ini!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("Anda tidak menyebut pengguna untuk menendang!");
    }
  }

  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('/ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Berhasil dibanned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('Orang Ini Engga Bisa Di Ban');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("Pengguna itu tidak ada di group ini!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("Anda tidak menyebut pengguna untuk diban!");
    }
  }
})





client.login(setting.token);