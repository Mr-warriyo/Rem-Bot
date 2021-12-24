const client = require("../Rem")
const chatbotModel = require("../models/chatbotModel")
const stm = require("smartestchatbot")
const scb = new stm.Client()

client.on("messageCreate", async (message) => {
  if (message.author.bot) return
  const channelId = message.channel.id
  const guildId = message.guild.id

  const a = await chatbotModel.findOne({
    guildId,
  })

  if (!a) return
  if (a) {
    if (message.channel.id === a.channelId) {
      if (message.author.bot) return
 
      const messageC = message.content

      if (messageC.includes(`@`)) {
        return message.reply({
          content: `Don't mention anyone!!`,
        })
      }
      try {
        scb
          .chat({
            message: messageC,
            name: client.user.username,
            owner: "@Akshansh#2200",
            user: message.author.id,
            language: "english",
          })
          .then((reply) => {
            message.reply(`${reply}`)
          })
          .catch((err) => {
            message.reply({
              content: `Some unkown error occured! we'll fix it soon. If not fixed, ping @Akshansh#2200.`,
            })
            console.log(err)
          })
      } catch (err) {
        message.reply({
          content: `Some unkown error occured! we will fix it soon. If not fixed, ping @Akshansh#2200.`,
        })
        console.log(err)
      }
    }
  }
})
