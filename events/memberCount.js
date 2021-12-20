const client = require("../Rem")

const countChannel = "921646760508674088"
const goalChannel = "921645870422851594"

client.on("ready", () => {
  const updateMembers = (guild) => {
    const coderCount = guild.channels.cache.get(countChannel)
    const coderGoal = guild.channels.cache.get(goalChannel)
    if (coderCount) {
      coderCount.setName(
        `📱｜CODER COUNT: ${guild.memberCount.toLocaleString()}`
      )
    }
    if (coderGoal) {
      coderGoal.setName(`🥅｜CODER GOAL: ${guild.memberCount + 50}`)
    }
    if (!coderGoal || !coderCount) {
      console.log("Invalid Coder Count/Coder Goal Channel!")
    }
  }

  client.on("guildMemberAdd", (member) => updateMembers(member.guild))
  client.on("guildMemberRemove", (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get("716912981350547539")
  updateMembers(guild)
})
