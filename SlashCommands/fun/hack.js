const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "hack",
  description: "Hack a User for fun!",
  type: "CHAT_INPUT",
  category: "fun",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "User you want to hack.",
      type: "USER",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const user = client.users.cache.get(args[0])

    if (user.id === client.user.id) {
      interaction.followUp({
        content: "Excuse Me? You are not allowed to hack me!",
      })
      return false
    }

    const msg = await interaction.followUp({
      content: `Starting to hack ${user.tag}`,
    })

    const gmails = [
      "bruh@gmail.com",
      "iamgroot@gmail.com",
      "mongoose@gmail.com",
      "it'sgroot@gmail.com",
      "1234@gmail.com",
    ]
    var rangmails = gmails[Math.floor(Math.random() * gmails.length)]

    setTimeout(() => {
      msg.edit(
        `Hacked Gmail! It's \`${user.tag}${rangmails}\` and Password is ${user.id}`
      )
    }, 02000)
    setTimeout(() => {
      msg.edit("Ejected Virus in their device")
    }, 03000)
    setTimeout(() => {
      msg.edit("Deleted their accounts")
    }, 02000)
    setTimeout(() => {
      msg.edit("Collected all their data")
    }, 03000)
    setTimeout(() => {
      msg.edit("Rebooted their device")
    }, 02000)
    setTimeout(() => {
      msg.edit(
        "The last and most dangerous hack is completed and all their data is hacked[Sold on Dark Web & earned 10000$, they were a gold fish :)]"
      )
    }, 03000)
  },
}
