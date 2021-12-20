const Discord = require("discord.js")
const { MessageEmbed } = Discord

module.exports = {
  name: "eval",
  description: "Test a javascript/discord.js code!",
  type: "CHAT_INPUT",
  category: "mod",
  userPerms: ["ADMINISTRATOR"],
  botPerms: ["ADMINISTRATOR"],
  options: [
    {
      name: "code",
      description: "provide the javascript/discord.js code here",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const c = interaction.options.get("code").value
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
