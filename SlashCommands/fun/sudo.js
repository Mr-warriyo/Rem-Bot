const Discord = require("discord.js")
const { MessageEmbed } = Discord

module.exports = {
  name: "sudo",
  description: "Updated version of say command! Try to see the magic 😉",
  type: "CHAT_INPUT",
  category: "fun",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_WEBHOOKS"],
  options: [
    {
      name: "user",
      description: "mention a user!",
      type: "USER",
      required: true,
    },
    {
      name: "text",
      description: "type some text",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const tt = args[1]

    if (args[0] && tt) {
      const uu = client.users.cache.get(args[0])

      interaction.channel
        .createWebhook(uu.username, {
          avatar: uu.displayAvatarURL({
            dynamic: true,
          }),
        })
        .then((webhook) => {
          webhook.send(tt)
          setTimeout(() => {
            webhook.delete()
          }, 2000)
        })

      interaction.followUp({
        content: "✅｜Command was successfully Executed!",
      })
    }
  },
}
