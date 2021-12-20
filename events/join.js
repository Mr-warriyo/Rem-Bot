const client = require("../Rem")
const { MessageEmbed } = require("discord.js")

client.on("guildMemberAdd", (member, guild) => {
  const em = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("Member Joined!!")
    .setColor("GREEN")
    .setDescription(
      `Hey User!\nWelcome to ASTRO server. Here you can talk, play, code, ask doubts about coding, ask solutions for errors & get help related to ASTRO APP.\n\nI've some server tips for you, Please read the things written below {^~^}`
    )
    .addField(
      "YouTube Channel (For Tips & Tutorials):",
      "https://youtube.com/c/MrWarriyo"
    )
    .addField("Discord Server (For Support):", "https://discord.gg/pnYKx8Ch4F")
    .addField(
      "ASTRO APP Download (Play Store):",
      "https://play.google.com/store/apps/details?id=com.astrosohu"
    )
    .addField(
      "Channel Guide:",
      "Server Rules: <#775541705201156096>\nSelf Roles: <#884069287218798682>\nGeneral Chat: <#786568660290502666>\nIntroductions: <#808667565769228298>"
    )
    .setFooter(`User Name: ${member.user.username}.\nUser ID: ${member.id}.`)

  const WelcomeChannel = member.guild.channels.cache.get("775540873630973982")

  if (!WelcomeChannel) {
    console.log("Welcome Channel not found! :( ")
  } else {
    WelcomeChannel.send({
      content: `Welcome ${member}!`,
      embeds: [em],
    })
  }
})
