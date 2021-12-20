const BattleSpecs = {
  hp: 800,
}

const AttackArr = [
  "KICK",
  "PUNCH",
  "PUNCH",
  "KICK",
  "PUNCH",
  "KICK",
  "KICK",
  "PUNCH",
]

const UserSpecs = {
  hp: BattleSpecs.hp,
  attacks: AttackArr,
}

const BotSpecs = {
  hp: BattleSpecs.hp,
  attacks: AttackArr,
}

module.exports = (BattleSpecs, AttackArr, UserSpecs, BotSpecs)
