const Discord = require("discord.js")

module.exports = {
  name: "clear",
  description: "deletes the messages!",
  type: "CHAT_INPUT",
  category: "mod",
  userPerms: [
    "MANAGE_MESSAGES",
    "MANAGE_GUILD",
    "SEND_MESSAGES",
    "EMBED_LINKS",
  ],
  botPerms: ["MANAGE_MESSAGES", "MANAGE_GUILD"],
  options: [
    {
      name: "messages",
      description:
        "Number of message you want to delete, must be under 100 & more than 0",
      type: "NUMBER",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const num = interaction.options.get("messages").value
    const amount = parseInt(num) + 1
    if (amount < +1 || amount >= 100) {
      return interaction.followUp({
        content: `Enter a Number which is bewteen 1 & 99!`,
      })
    }
    interaction.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err)
      return interaction.followUp({
        content: `Some error occured! Try again Later if error continues contact @Akshansh#6969.`,
      })
    })
    interaction.channel.send({
      content: `✅｜Command Successfully Executed!`,
    })
  },
}
