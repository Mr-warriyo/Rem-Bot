const client = require("../Rem")
const db = require("../Rem")

/*
const {OP} = require("opmongo")
const db = new OP(process.env.mongo)
*/

const timenow = new Date()
let as = 0
client.on("ready", () => {
  console.log(`[${timenow}] Logged in as ${client.user.tag}!`)
  setInterval(() => {
    client.user.setActivity("Global Chat & Other Commands :)", {
      type: "STREAMING",
      url: "https://youtube.com/c/MrWarriyo",
    })
    as++
  }, 3600) 
})
/*
let sdjs = require('sanikava-djs')
sdjs.yt(client, db, {
 ytID: "UC8TbKNKl-IDoE12V4WxwwDQ",
 chid:"884146658085060638"
})*/
