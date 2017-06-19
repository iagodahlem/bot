'use strict'

const fs = require('fs')
const path = require('path')

if (fs.existsSync(path.join(__dirname, '.env'))) {
  require('node-env-file')(__dirname + '/.env')
}

const chalk = require('chalk')
const slack = require('slack')
const toggl = require('./toggl')

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const bot = slack.rtm.client()

const connectToWork = () => {
  console.log(chalk.yellow('dispatched connected from work'))
  toggl.startTimeEntry()
}

const disconnectFromWork = () => {
  console.log(chalk.yellow('dispatched disconnected from work'))
  toggl.stopTimeEntry()
}

const dispatch = (action) => {
  switch (action) {
    case 'connected to work':
      connectToWork()
      return
    case 'disconnected from work':
      disconnectFromWork()
      return
    default:
      return
  }
}

bot.started((payload) => {
  console.log(chalk.green('Bot successfuly started.'))
})

bot.message((message) => {
  const text = message.text || message.attachments[0].text
  dispatch(text)
})

bot.listen({ token: SLACK_BOT_TOKEN })
