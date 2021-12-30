const { play } = require("/data/data/com.termux/files/usr/lib/node_modules/op-music")

module.exports = {
  name: "play",
  description: "Play some melodies Music!",
  type: "CHAT_INPUT",
  category: "music",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "song",
      description: "Name of Song you wanna Play!",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const channel = interaction.guild.me.voice.channel
    const song = args[0]

    console.log(song)
    // console.log(channel)

    if (!channel) {
      return interaction.followUp({
        content: "I'm not in a vc channel! Use `/joinvc` Command!",
      })
    }
    try {
      play({
        interaction: interaction,
        channel: channel,
        song: song,
      })
    } catch (error) {
      interaction.followUp({
        content: `Some Error Occured while Playing the Song!\nTry the command later. If it keeps giving error, Join my Support Server & Contact \`@Akshansh#2200\`.`,
      })
      console.log(interaction.guild.id, `\n${error}`)
    }
  },
}
