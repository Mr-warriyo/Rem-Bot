const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "timeout",
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
    
    
  },
}
