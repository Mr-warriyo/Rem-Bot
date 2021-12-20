const client = require("../Rem")
const v13 = require("sanikava-djs")

client.on("messageDelete", async (message) => {
  v13.gp(message, {
    credit: false,
  })
})
