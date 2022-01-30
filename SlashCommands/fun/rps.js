const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const {
  rps,
} = require("/storage/emulated/0/Documents/ASTRO/projects/djs-zetsu/zetsu.js")

module.exports = {
  name: "rps",
  description: "Rock Paper Scissors! You v/s Other Player. Let the Game begin!",
  type: "CHAT_INPUT",
  category: "fun",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "opponent",
      description: "Opponent against whom you'll fight",
      type: "USER",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    rps(interaction, {
      embedColor: "RANDOM",
    })
  },
}
