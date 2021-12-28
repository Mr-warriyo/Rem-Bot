const {event} = require('op-music')


event.on("playSong", (channel, songInfo, requester) => {
  channel.send({
    content: `Started playing the song [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} | Requested by \`${requester.tag}\``,
  })
})
