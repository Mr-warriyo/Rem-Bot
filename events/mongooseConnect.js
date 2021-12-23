const client = require("../Rem")
const { connect } = require("mongoose")
const { uri } = require("../settings/config.json")

client.on("ready", () => {
  connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log("\nConnected to MongoDB!")
})