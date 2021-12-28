const { event, play } = require("op-music")

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

    console.log(channel)

    if (!channel) {
      return interaction.followUp({
        content: "I'm not in a vc channel! Use `/joinvc` Command!",
      })
    }

    play({
      interaction: interaction,
      channel: channel,
      song: song,
    })

    event.on("playSong", (channel, songInfo, requester) => {
      channel.send({
        content: `Started playing the song [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} | Requested by \`${requester.tag}\``,
      })
    })
  },
}
