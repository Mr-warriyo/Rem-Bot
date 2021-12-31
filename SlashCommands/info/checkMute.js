const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "mutecheck",
  description: "Check wether the User is Muted/Timed Out or Not.",
  type: "CHAT_INPUT",
  category: "info",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "User whose Timeout/Mute you want to check.",
      type: "USER",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const member = interaction.guild.members.cache.get(args[0])

    let tf = member.isCommunicationDisabled()
    let time = member.communicationDisabledUntilTimestamp - Date.now()

    if (tf) {
      let milliseconds = Math.floor(time)
      let seconds = Math.floor(milliseconds / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)
      let days = Math.floor(hours / 24)

      milliseconds %= 1000
      seconds %= 60
      minutes %= 60
      hours %= 24

      const GG = new MessageEmbed()
        .setTitle("Checked the Mute/Timeout left for the user!")
        .setColor("GREEN")
        .setAuthor({
          name: client.user.username,
          url: client.user.avatarURL({ dynamic: true }),
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .addField(
          "Duration left:",
          `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds & ${milliseconds} Milli Seconds.`
        )

      interaction.followUp({
        embeds: [GG],
      })
    } else {
      interaction.followUp({
        content: `User is not Muted/Timed Out!`,
      })
    }
  },
}
