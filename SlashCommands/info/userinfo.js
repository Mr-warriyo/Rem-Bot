const Discord = require("discord.js")
const { MessageEmbed } = Discord

module.exports = {
  name: "info",
  description:
    "Check the info of tagged user, if no user is tagged it shows your info!",
  type: "CHAT_INPUT",
  category: "info",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "Tag a user to see their user info!",
      type: "USER",
      required: false,
    },
  ],
  execute: async (client, interaction, args) => {
    let user =
      interaction.guild.members.cache.get(args[0]) || interaction.member


    const embed = new MessageEmbed()
      .setTitle(`${user.user.username} stats`)
      .setColor(`#f3f3f3`)
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "Name: ",
          value: user.user.username,
          inline: true,
        },
        {
          name: "#️⃣ Discriminator: ",
          value: `#${user.user.discriminator}`,
          inline: true,
        },
        {
          name: "🆔 ID: ",
          value: user.user.id,
        },
        {
          name: "Avatar link: ",
          value: `[Click Here](${user.user.displayAvatarURL()})`,
        },
        {
          name: "Creation Date: ",
          value: user.user.createdAt.toLocaleDateString("en-us"),
          inline: true,
        },
        {
          name: "Joined Date: ",
          value: user.joinedAt.toLocaleDateString("en-us"),
          inline: true,
        },
        {
          name: "User Roles: ",
          value: user.roles.cache.map((role) => role.toString()).join(", "),
          inline: true,
        }
      )

    await interaction.followUp({
      embeds: [embed],
    })
  },
}
