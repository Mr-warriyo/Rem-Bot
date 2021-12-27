const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "serverinfo",
  description: "Shows the Info of the Server",
  type: "CHAT_INPUT",
  category: "serverInfo",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute: async (client, interaction, args) => {
    const { guild } = interaction
    const {
      name,
      id,
      iconURL,
      createdAt,
      ownerId,
      roles,
      emojis,
      premiumTier,
      explicitContentFilter,
      verificationLevel,
      features,
      stickers,
      memberCount,
      channels,
    } = guild
    const then = moment(createdAt)
    const time = then.from(moment())
    const ca = then.format("MMM Do, YYYY")

    const embed = new MessageEmbed()
      .setAuthor({
        name: `Name: ${name}\nID: ${id}`,
        url: `${guild.iconURL({ dynamic: true }) || ""}`,
        iconURL: `${guild.iconURL({ dynamic: true }) || ""}`,
      })
      .setColor("RANDOM")
      .setThumbnail(`${guild.iconURL({ dynamic: true }) || ""}`)
      .addFields(
        {
          name: "**Owner**:",
          value: `<@!${ownerId}>`,
          inline: true,
        },
        {
          name: "**Server Created At**:",
          value: `${ca}(${time})`,
          inline: true,
        },
        {
          name: "**Roles**:",
          value: `${roles.cache.size}`,
          inline: true,
        },
        {
          name: "**Emojis**:",
          value: `${emojis.cache.size}`,
          inline: true,
        },
        {
          name: "**Stickers**:",
          value: `${stickers.cache.size}`,
          inline: true,
        },
        {
          name: "**Boosting Tier**:",
          value: `${premiumTier}`,
          inline: true,
        },
        {
          name: "**Verification Level**:",
          value: `${verificationLevel}`,
          inline: true,
        },
        {
          name: "**Explicit Content Filter**:",
          value: `${explicitContentFilter}`,
          inline: true,
        },
        {
          name: "**Members**:",
          value: `${memberCount}`,
          inline: true,
        },
        {
          name: "**Channels**:",
          value: `⌨️ ${
            channels.cache.filter((channel) => channel.type == "GUILD_TEXT")
              .size
          } \| 🔈 ${
            channels.cache.filter((channel) => channel.type == "GUILD_VOICE")
              .size
          } \| 📁 ${
            channels.cache.filter((channel) => channel.type == "GUILD_CATEGORY")
              .size
          } \| 📢 ${
            channels.cache.filter((channel) => channel.type == "GUILD_NEWS")
              .size
          }`,
          inline: true,
        },
        {
          name: "**Community Features**:",
          value: `${features.join(", ") || "No Community Features"}`,
          inline: true,
        }
      )

    interaction.followUp({
      embeds: [embed],
    })
  },
}
