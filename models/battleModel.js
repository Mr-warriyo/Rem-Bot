const { Schema, model } = require("mongoose")

const StrUnqReq = {
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
  required: false,
  unique: false,
}

const BATTLE = new Schema(
  {
    userId: StrUnqReq,
    wins: Num,
    loses: Num,
    totalGamesPlayed: Num,
  },
  {
    collection: "battle",
  }
)

const battleModel = model("Battle", BATTLE)

module.exports = battleModel
