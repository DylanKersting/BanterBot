import tmi from 'tmi.js'

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: [
    'greengogg'
  ],
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  }
});

client.connect();

export const speech = (ctx: KoaContext) => {
  console.log(ctx.request.body)
  client.say('greengogg', ctx.request.body.text)
  ctx.response.status = 200
}