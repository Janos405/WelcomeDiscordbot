// Importing required modules
const { Client, GatewayIntentBits, Partials, ActivityType, EmbedBuilder} = require('discord.js');
const fs = require('fs');


const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

// Initializing the bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// Setting bot activity
client.once('ready', () => {
    client.user.setActivity(config.bot_status, { type: ActivityType.Watching });
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event handler for member joining
client.on('guildMemberAdd', async member => {
    const channel1 = await client.channels.fetch('YOUR JOIN CHANEL ID');
    const embed1 = new EmbedBuilder()
        .setTitle("Csatlakozás")
        .setDescription(`> Köszönjük, ${member} (\`${member.user.username}\`), hogy csatlakoztál a szerverhez!\n> Te vagy a(z) **${member.guild.memberCount}.** tag!`)
        .setColor(0x027067)
        .setTimestamp()
        .setAuthor({ name: "Manager - Join", iconURL: client.user.displayAvatarURL() })
        .setThumbnail(config.thumbnail_url)
        .setFooter({ text: "Developper:S.Jani", iconURL: member.guild.iconURL() });
    await channel1.send({ embeds: [embed1] });

    const channel2 = await client.channels.fetch('YOUR JOIN LOG CHANEL ID');
    const embed2 = new EmbedBuilder()
        .setTitle("Belépés a szerverre.")
        .setDescription(`> ${member} *(${member.id})* belépett a szerverre! \n> Mostmár **${member.guild.memberCount}-en/-an** vagyunk a szerveren!`)
        .setColor(0x027067)
        .setTimestamp()
        .setAuthor({ name: "Manager - Join LOG", iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: member.displayName, iconURL: member.displayAvatarURL() });
    await channel2.send({ embeds: [embed2] });
});

// Event handler for member leaving
client.on('guildMemberRemove', async member => {
    const channel1 = await client.channels.fetch('YOUR LEAVE CHANEL ID');
    const embed1 = new EmbedBuilder()
        .setTitle("Kilépés")
        .setDescription(`> ${member} (\`${member.user.username}\`) elhagyta a szervert!\n> Nélküled csak **${member.guild.memberCount}** tagunk van!`)
        .setColor(0x027067)
        .setTimestamp()
        .setAuthor({ name: "Manager - Leave", iconURL: client.user.displayAvatarURL() })
        .setThumbnail(config.thumbnail_url)
        .setFooter({ text: "Developper:S.Jani", iconURL: member.guild.iconURL() });
    await channel1.send({ embeds: [embed1] });

    const channel2 = await client.channels.fetch('YOUR LEAVE LOG CHANEL ID');
    const embed2 = new EmbedBuilder()
        .setTitle("Kilépés a szerverről.")
        .setDescription(`> ${member} *(${member.id})* kilépett a szerverről! \n> Nélküle már csak **${member.guild.memberCount}-en/-an** vagyunk bent a szerveren!`)
        .setColor(0x027067)
        .setTimestamp()
        .setAuthor({ name: "Manager - Leave LOG", iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: member.displayName, iconURL: member.displayAvatarURL() });
    await channel2.send({ embeds: [embed2] });
});

// Logging into the bot
client.login(config.token);
