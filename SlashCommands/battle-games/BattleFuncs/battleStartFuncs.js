async function BattleLoop(p1hp, p2hp, newAttack, msg) {
  if (p1hp <= 0 && p2hp > p1hp) {
    await msg.edit({
      content: `Player 2(User) Won the Game! Congratulations & celebrations!!`,
    })
  } else if (p2hp <= 0 && p2hp < p1hp) {
    await msg.edit({
      content: `Player 1(Bot) Won the Game! Better Luck next time Mr/Mrs. User!!`,
    })
  } else if (p1hp !== 0 && p2hp !== 0) {
    newAttack(p1hp, p2hp)
  }
}

module.exports = (BattleLoop)