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

const ECONOMY = new Schema(
  {
    userId: StrUnq,
    zachs: Num,
  },
  {
    collection: "economy",
  }
)

const economyModel = model("Economy", ECONOMY)

module.exports = economyModel
