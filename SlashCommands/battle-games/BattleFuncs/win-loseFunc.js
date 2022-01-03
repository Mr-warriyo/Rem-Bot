const battleModel = require("../../../models/battleModel")

async function userWon(botId, userId, msg) {
  const uM = await battleModel.findOne({
    userId,
  })

  if (uM) {
    const wins = uM.wins + 1
    const loses = uM.loses - 1
    const totalGamesPlayed = uM.totalGamesPlayex + 1
    const newUM = await battleModel.fineOneAndUpdate(
      {
        userId,
      },
      {
        wins,
        loses,
        totalGamesPlayed,
      }
    )
  } else {
    const wins = 1
    const loses = 0
    const totalGamesPlayed = 1
    const newUM = await battleModel.create({
      userId,
      wins,
      totalGamesPlayed,
    })
  }
}

async function botWon(botId, userId, msg) {
  const uM = await battleModel.findOne({
    userId,
  })

  if (uM) {
    const wins = uM.wins - 1
    const loses = uM.loses + 1
    const totalGamesPlayed = uM.totalGamesPlayed + 1
    const newUM = await battleModel.fineOneAndUpdate(
      {
        userId,
      },
      {
        wins,
        loses,
        totalGamesPlayed,
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

module.exports = (userWon, botWon)
