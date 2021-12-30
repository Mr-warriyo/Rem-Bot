const Discord = require("discord.js")
const { MessageEmbed } = Discord

module.exports = {
  name: "eval",
  description: "Test a javascript/discord.js code!(Owner Only Command!)",
  type: "CHAT_INPUT",
  category: "mod",
  ownerOnly: true,
  options: [
    {
      name: "code",
      description: "provide the javascript/discord.js code here",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const c = args[0]
    /** 
      console.clear()
      console.log(c)
    */

    try {
      const { inspect } = require("util")
      evaled = await eval(c)
      interaction.followUp({
        content: inspect(evaled),
      })
    } catch (error) {
      console.log(error)
      interaction.followUp({
        content: "Error in Console!",
      })
    }
  },
}
