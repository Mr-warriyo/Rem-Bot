const figlet = require("figlet")

module.exports = {
  name: "ascii",
  description: "Convert the text into ASCII!!",
  type: "CHAT_INPUT",
  category: "fun",
  options: [
    {
      name: "text",
      description: "Text which will be converted into ASCII",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    let text = args.join(" ")
    if (text.length > 20) {
      return interaction.followUp(
        `Please put text that has 20 characters or less because the conversion won't be good!`
      )
    }

    figlet(text, function (err, data) {
      interaction.followUp(data, {
        code: "AsciiArt",
      })
    })
  },
}
