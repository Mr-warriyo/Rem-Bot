const client = require("../Rem")
const { connect } = require("mongoose")
const { uri } = require("../settings/config.json")

client.on("ready", () => {
  try {
    connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log("\n[DATABASE] Connected to MongoDB Successfully!")
  } catch (error) {
    console.log(`[DATABASE: ERROR]:\n`, error)
  }
})
