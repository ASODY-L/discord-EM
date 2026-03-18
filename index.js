const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = "MTI2OTQ3ODcwNDY2OTY1NTA2Mg.GDNs4o.HgN8HXo1NsG_U384LGnVs9AmZA1OrCFCGSFv4I";
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // 🔊 أمر دخول
  if (message.content === "!join") {
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply("ادخل روم صوتي اول 😅");
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    message.reply("دخلت الروم 🔊");
  }

  // ❌ أمر خروج
  if (message.content === "!leave") {
    const connection = getVoiceConnection(message.guild.id);

    if (!connection) {
      return message.reply("انا اصلاً مو داخل 😅");
    }

    connection.destroy();
    message.reply("طلعت من الروم 👋");
  }
});

client.login(TOKEN);
