const { Schema, model } = require("mongoose")

const StrUnq = {
  type: String,
  required: true,
  unique: true,
}

const Str = {
  type: String,
  required: true,
  unique: false,
}

const Arr = {
  type: Array,
  required: true,
  unique: false,
}

const Num = {
  type: Number,
  required: true,
  unique: false,
}

const BATTLE = new Schema(
  {
    userId: StrUnq,
    wins: Num,
    totalGamesPlayed: Num,
  },
  {
    collection: "battle",
  }
)

const battleModel = model("Battle", BATTLE)

module.exports = battleModel
