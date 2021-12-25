const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "mute",
  description: "Timeouts/Mutes the tagged user from the guild!",
  type: "CHAT_INPUT",
  category: "mod",
  userPerms: ["TIMEOUT_MEMBERS", "SEND_MESSAGES", "EMBED_LINKS"],
  botPerms: ["TIMEOUT_MEMBERS", "SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      type: "USER",
      description: "Tag a User who will be muted/timed out",
      required: true,
    },
    {
      name: "reason",
      type: "STRING",
      description: "Reason for muting/timing out this user",
      required: true,
    },
    {
      name: "time",
      type: "NUMBER",
      description: "Time user will stay muted till. Time is in milliseconds.",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const userId = args[0]
    const reason = args[1]
    const time = args[2]
    const member = interaction.guild.members.cache.get(userId)
    const botAv = client.user.avatarURL({
      dynamic: true,
    })
    let seconds = Math.floor(time / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)

    seconds %= 60
    minutes %= 60
    hours %= 24

    const MB = new MessageEmbed()
      .setTitle("Timed Out/Muted User!")
      .setColor("GREEN")
      .setAuthor(client.user.username, botAv)
      .setDescription(`<@!${userId}> has been Muted/Timed Out!`)
      .addField(
        "Duration:",
        `${days} Days, ${hours} Hours, ${minutes} Minutes & ${seconds} Seconds.`
      )
      .addField("Reason:", `${reason}`)
      .addField("Muted By:", `${interaction.user}`)

    try {
      await member.timeout(time, reason)
      interaction.followUp({
        embeds: [MB],
      })
    } catch (err) {
      if (err) {
        console.log(err)
        return interaction.followUp({
          content: `Unable to Timeout User because of some error. If it continues contact \`@Akshansh#2200\`.`,
        })
      }
    }
  },
}
