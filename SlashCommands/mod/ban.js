const Discord = require("discord.js")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "ban",
  description: "bans the tagged user from the guild!",
  type: "CHAT_INPUT",
  category: "mod",
  userPerms: ["BAN_MEMBERS", "SEND_MESSAGES", "EMBED_LINKS"],
  botPerms: ["BAN_MEMBERS", "SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      type: "USER",
      description: "Tag a User who will be banned",
      required: true,
    },
    {
      name: "reason",
      type: "STRING",
      description: "Reason for banning this user",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const u = interaction.options.get("user")
    const r = interaction.options.get("reason")
    const user = client.users.cache.get(u.value)
    const member = interaction.guild.members.cache.get(u.value)
    const reason = r.value

    const BanEmbed = new MessageEmbed()
      .setTitle("User was successfully Banned from this guild!")
      .setDescription("Here's some Important Information given below ↓")
      .setColor("GREEN")
      .addField("Moderator:", interaction.user.tag)
      .addField("Banned User:", user.tag)
      .addField("Reason:", reason)

    const Hierarchy = new MessageEmbed()
      .setTitle("Error while Banning the user from this guild!")
      .setColor("RED")
      .addField(
        "Reason:",
        "I was unable to Ban the user because user's role is higher than mine!"
      )

    if (!member.bannable) {
      interaction.followUp({
        embeds: [Hierarchy],
      })
    } else {
      interaction.followUp({
        embeds: [BanEmbed],
      })
      member.ban({ reason })
    }
  },
}
