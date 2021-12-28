const { MessageEmbed } = require("discord.js")
const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
  name: "joinvc",
  description: "Make the bot join same Voice Channel as you!",
  type: "CHAT_INPUT",
  category: "music",
  execute: async (client, interaction, args) => {
    // MessageEmbeds
    const ErrEm = new MessageEmbed()
      .setTitle("Error!!")
      .setColor("RED")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        "Some Error occured while executing the command. You can find details of error below:"
      )

    const Joined = new MessageEmbed()
      .setTitle("Joined!")
      .setColor("GREEN")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        "Successfully Joined the Voice Channel! You can find the Joined Vc's info below:"
      )

    if (!interaction.member.voice.channel) {
      ErrEm.addField(
        "Vc not Joined!",
        "You've not joined a Voice Channel! Join it to use this command."
      )
      return interaction.followUp({
        embeds: [ErrEm],
      })
    } else if (interaction.guild.me.voice.channel) {
      ErrEm.addField(
        "VC Already Joined",
        "I have already joined a Voice Channel!"
      )
      ErrEm.addField(
        "Vc I'm Joined in:",
        `<#${interaction.guild.me.voice.channel.id}>`
      )
      return interaction.followUp({
        embeds: [ErrEm],
      })
    } else {
      const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      })

      Joined.addField(
        "VC Channel:",
        `<#${interaction.member.voice.channel.id}>`
      )
      Joined.addField(
        "Channel Join requested by:",
        interaction.member.user.username
      )

      interaction.followUp({
        embeds: [Joined],
      })
    }
  },
}
