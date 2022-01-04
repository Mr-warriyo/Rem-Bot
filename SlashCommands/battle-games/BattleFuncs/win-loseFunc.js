const battleModel = require("../../../models/battleModel")

async function userWon(botId, userId, msg) {
  const uM = await battleModel.findOne({
    userId,
  })

  if (uM) {
    const wins = uM.wins + 1
    const totalGamesPlayed = uM.totalGamesPlayed + 1
    const newUM = await battleModel
      .findOneAndUpdate(
        {
          userId,
        },
        {
          wins,
          totalGamesPlayed,
        },
        {
          new: true,
        }
      )
      .clone()
      .catch((err) => console.log(err))
  } else {
    const wins = 1
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
    const totalGamesPlayed = uM.totalGamesPlayed + 1
    const newUM = await battleModel
      .findOneAndUpdate(
        {
          userId,
        },
        {
          totalGamesPlayed,
        },
        {
          new: true,
        }
      )
      .clone()
      .catch((err) => console.log(err))
  } else {
    const wins = 0
    const totalGamesPlayed = 1
    const newUM = await battleModel.create({
      userId,
      wins,
      totalGamesPlayed,
    })
  }
}

module.exports = (botWon, userWon)
