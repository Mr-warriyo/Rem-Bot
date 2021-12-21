const client = require("../Rem")
const { connect } = require("mongoose")
const { uri } = require("../settings/config.json")

connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
console.log("\nConnected to MongoDB!")
