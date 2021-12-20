const Discord = require("discord.js")
const stm = require("smartestchatbot")
const scb = new stm.Client()

module.exports = {
  name: "chat",
  description: "ChatBot feature, but with Slash Commands!",
  type: "CHAT_INPUT",
  category: "fun",
  options: [
    {
      name: "message",
      description: "Type a message & bot will reply you!",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    if (interaction.user.bot) return
    if (
      interaction.guild.id !== "812617163927584788" &&
      interaction.channel.id !== "886626418954489926"
    ) {
      return interaction.followUp({
        content: "I'll only reply in <#886626418954489926> Channel!",
      })
    }

    const messageC = interaction.options.get("message").value

    if (messageC.includes(`@`)) {
      return interaction.followUp({
        content: `Don't mention anyone!!`,
      })
    }
    try {
      scb
        .chat({
          message: messageC,
          name: client.user.username,
          owner: "@Akshansh#2200",
          user: interaction.user.id,
          language: "english",
        })
        .then((reply) => {
          interaction.followUp(`${reply}`)
        })
        .catch((err) => {
          interaction.followUp({
            content: `Some unkown error occured! we'll fix it soon. If not fixed, ping @Akshansh#2200.`,
          })
          console.log(err)
        })
    } catch (err) {
      interaction.followUp({
        content: `Some unkown error occured! we will fix it soon. If not fixed, ping @Akshansh#2200.`,
      })
      console.log(err)
    }
  },
}
