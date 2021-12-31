const client = require("../Rem")
const welcomeChModel = require("../models/welcomeChannelModel")
const { MessageEmbed } = require("discord.js")

client.on("guildMemberAdd", async (member, guild) => {
  const guildId = guild.id

  const a = await welcomeChModel.findOne({
    guildId,
  })

  if (!a) return
  if (a) {
    const ch = guild.channels.cache.get(welcomeChModel.channelId)
    if (!ch)
      if (ch) {
        const welcEm = new MessageEmbed()
          .setTitle(`A User Just Hopped into the Server!`)
          .setColor("RANDOM")
          .setAuthor({
            name: member.user.tag,
            url: member.user.avatarURL({ dynamic: true }),
            iconURL: member.user.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(`${member.user.tag} Just Joined the Server!`)
          .addField(
            "User Info:",
            `\nUserName: ${member.user.tag}.\nUserID: ${member.user.id}.`
          )
          .addField(
            "Account Details:",
            `User Account Created At: ${user.user.createdAt.toLocaleDateString(
              "en-us"
            )}\nUser Joined Server At: ${user.joinedAt.toLocaleDateString(
              "en-us"
            )}`
          )
          .setImage(member.user.displayAvatarURL({ dynamic: true }))
          .setFooter({
            text: `Thanks for Joining ${guild.name}. I hope you will have a good Stay here!`,
            iconURL: guild.iconURL({ dynamic: true }),
          })

        ch.send({
          content: `Welcome ${member.user.tag}!`,
          embeds: [welcEm],
        })
      }
  }
})
