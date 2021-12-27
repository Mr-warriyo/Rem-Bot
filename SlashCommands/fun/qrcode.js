const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "qrcode",
  description: "Encrypt the Text into QR Code & scan it :)",
  type: "CHAT_INPUT",
  category: "fun",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "text",
      description: "Enter text to encrypt!",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const Msg = args.join("+")
    if (!Msg) return interaction.followUp("Please Give Your Message")

    const Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setImage(
        encodeURI(
          `https://chart.googleapis.com/chart?chl=${Msg}&chs=200x200&cht=qr&chld=H|0`
        )
      )
      .setTimestamp()

    return interaction.followUp({
      embeds: [Embed],
    })
  },
}
