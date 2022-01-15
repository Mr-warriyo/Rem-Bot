const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const client = require("../../../Rem")
const AttackArr = require("../battlesettings")
const UserSpecs = require("../battlesettings")
const BotSpecs = require("../battlesettings")
let Player1HP = BotSpecs.hp
let Player2HP = UserSpecs.hp
let newBHP
let newUHP
let botAttack
function BotAttack() {
  botAttack =
    BotSpecs.attacks[Math.floor(Math.random() * BotSpecs.attacks.length)]
}
let userDamage
const UserDamage = () => {
  userDamage = Math.floor(Math.random() * 200)
}
let botDamage
const BotDamage = () => {
  botDamage = Math.floor(Math.random() * 200)
}
let randomAttack
function RandomAttack() {
  randomAttack =
    UserSpecs.attacks[Math.floor(Math.random() * UserSpecs.attacks.length)]
}
const battleModel = require("../../../models/battleModel")
async function userWon(botId, userId, msg) {
  const uM = await battleModel.findOne({
    userId,
  })

  if (uM) {
    const wins = uM.wins + 1
    const loses = uM.loses
    const totalGamesPlayed = uM.totalGamesPlayed + 1
    const newUM = await battleModel.findOneAndUpdate(
      {
        userId,
      },
      {
        wins,
        loses,
        totalGamesPlayed,
      },
      {
        new: true,
      }
    )
  } else {
    const wins = 1
    const loses = 0
    const totalGamesPlayed = 1
    const newUM = await battleModel.create({
      userId,
      wins,
      loses,
      totalGamesPlayed,
    })
  }
}

async function botWon(botId, userId, msg) {
  const uM = await battleModel.findOne({
    userId,
  })

  if (uM) {
    const wins = uM.wins
    const loses = uM.loses + 1
    const totalGamesPlayed = uM.totalGamesPlayed + 1
    const newUM = await battleModel.findOneAndUpdate(
      {
        userId,
      },
      {
        wins,
        loses,
        totalGamesPlayed,
      },
      {
        new: true,
      }
    )
  } else {
    const wins = 0
    const loses = 1
    const totalGamesPlayed = 1
    const newUM = await battleModel.create({
      userId,
      wins,
      loses,
      totalGamesPlayed,
    })
  }
}

async function start(interaction, BattleBeginEm) {
  const BattleBeginButton = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Kick")
      .setStyle("DANGER")
      .setCustomId("KICK")
      .setEmoji("🦶"),
    new MessageButton()
      .setLabel("Punch")
      .setStyle("DANGER")
      .setCustomId("PUNCH")
      .setEmoji("🤜"),
    new MessageButton()
      .setLabel("Random")
      .setStyle("DANGER")
      .setCustomId("RANDOM")
  )

  await interaction.followUp({
    embeds: [BattleBeginEm],
  })
  let msg = await interaction.followUp({
    content:
      "Use Buttons to select a move! Timeout for current moves: 30seconds.",
    components: [BattleBeginButton],
  })
  colEvent(interaction, msg)
}

async function colEvent(interaction, msg) {
  const filter = (i) => i.user.id === interaction.user.id

  const collector = interaction.channel.createMessageComponentCollector({
    filter,
    time: 30000,
  })

  collector.on("collect", async (i) => {
    BotAttack()
    RandomAttack()
    BotDamage()
    UserDamage()
    if (i.customId === "KICK") {
      await i.update({
        content: `You chose \`KICK\`! Bot chose: \`${botAttack}\`.`,
        components: [],
        embeds: [],
      })
      let Player1HP = UserSpecs.hp - userDamage
      let Player2HP = UserSpecs.hp - botDamage
      collector.stop()
      if (Player1HP !== 0 && Player2HP !== 0) {
        return BattleLoop(Player1HP, Player2HP, newAttack, msg, interaction)
      }
    } else if (i.customId === "PUNCH") {
      await i.update({
        content: `You chose \`PUNCH\`! Bot chose: \`${botAttack}\`.`,
        components: [],
        embeds: [],
      })
      let Player1HP = UserSpecs.hp - userDamage
      let Player2HP = UserSpecs.hp - botDamage
      collector.stop()
      if (Player1HP !== 0 && Player2HP !== 0) {
        return BattleLoop(Player1HP, Player2HP, newAttack, msg, interaction)
      }
    } else if (i.customId === "RANDOM") {
      await i.update({
        content: `You chose \`${randomAttack}\`! Bot chose: \`${botAttack}\`.`,
        components: [],
        embeds: [],
      })
      let Player1HP = UserSpecs.hp - userDamage
      let Player2HP = UserSpecs.hp - botDamage
      collector.stop()
      if (Player1HP !== 0 && Player2HP !== 0) {
        return BattleLoop(Player1HP, Player2HP, newAttack, msg, interaction)
      }
    }
  })
  collector.on("end", (collected) => {
    if (collected.size <= 0) {
      msg.edit({
        components: [],
        embeds: [],
        content: "User did not choose any option. Ending the Battle.",
      })
    }
  })
}

async function BattleLoop(p1hp, p2hp, newAttack, msg, interaction) {
  if (p1hp <= 0 && p2hp > p1hp) {
    userWon(client.user.id, interaction.user.id, msg)
    await msg.edit({
      content: `Player 2(User) Won the Game! Congratulations & celebrations!!\n\n1 Win was added to your Battle Card! use \`/battlestats\` to see your current stats!`,
    })
  } else if (p2hp <= 0 && p2hp < p1hp) {
    botWon(client.user.id, interaction.user.id, msg)
    await msg.edit({
      content: `Player 1(Bot) Won the Game! Better Luck next time Mr/Mrs. User!!\n\n1 Lose was added to your Battle Card! use \`/battlestats\` to see your current stats!`,
    })
  } else if (p1hp !== 0 && p2hp !== 0) {
    newAttack(p1hp, p2hp, msg, interaction)
  }
}

async function newAttack(bhp, uhp, msg, interaction) {
  const newAttackEm = new MessageEmbed()
    .setTitle("Choose Another Attack!!")
    .setColor("GREEN")
    .setAuthor({
      name: client.user.username,
      url: client.user.avatarURL({ dynamic: true }),
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
    })
    .setDescription("You have 10 seconds, Choose another Attack!")
    .addField("Player 1 HP:(Bot)", `${bhp}/800`)
    .addField("Player 2 HP:(User)", `${uhp}/800`)

  const newAttackButton = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Kick")
      .setStyle("DANGER")
      .setCustomId("kick")
      .setEmoji("🦶"),
    new MessageButton()
      .setLabel("Punch")
      .setStyle("DANGER")
      .setCustomId("punch")
      .setEmoji("🤜"),
    new MessageButton()
      .setLabel("Random")
      .setStyle("DANGER")
      .setCustomId("random")
  )

  await msg.edit({
    embeds: [newAttackEm],
    components: [newAttackButton],
  })
  let Player1HP = bhp
  let Player2HP = uhp
  newAttackColEvent(Player1HP, Player2HP, msg, interaction)
}

async function newAttackColEvent(nbhp, nuhp, msg, interaction) {
  const filter = (i) => i.user.id === interaction.user.id

  const collector = interaction.channel.createMessageComponentCollector({
    filter,
    time: 10000,
  })

  collector.on("collect", async (i) => {
    BotAttack()
    RandomAttack()
    BotDamage()
    UserDamage()

    if (i.customId === "kick") {
      await i.update({
        content: `You chose \`KICK\`! Bot chose: \`${botAttack}\`.`,
        components: [],
        embeds: [],
      })
      let Player1HP = nbhp - userDamage
      let Player2HP = nuhp - botDamage
      collector.stop()
      if (Player1HP !== 0 && Player2HP !== 0) {
        return BattleLoop(Player1HP, Player2HP, newAttack, msg, interaction)
      }
    } else if (i.customId === "punch") {
      await i.update({
        content: `You chose \`PUNCH\`! Bot chose: \`${botAttack}\`.`,
        components: [],
        embeds: [],
      })
      let Player1HP = nbhp - userDamage
      let Player2HP = nuhp - botDamage
      collector.stop()
      if (Player1HP !== 0 && Player2HP !== 0) {
        return BattleLoop(Player1HP, Player2HP, newAttack, msg, interaction)
      }
    } else if (i.customId === "random") {
      await i.update({
        content: `You chose \`${randomAttack}\`! Bot chose: \`${botAttack}\`.`,
        components: [],
        embeds: [],
      })
      let Player1HP = nbhp - userDamage
      let Player2HP = nuhp - botDamage
      collector.stop()
      if (Player1HP !== 0 && Player2HP !== 0) {
        return BattleLoop(Player1HP, Player2HP, newAttack, msg, interaction)
      }
    }
  })

  collector.on("end", (collected) => {
    if (collected.size <= 0) {
      msg.edit({
        components: [],
        embeds: [],
        content: "User did not choose any option. Ending the Battle.",
      })
    }
  })
}

module.exports = start
