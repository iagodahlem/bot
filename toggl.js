'use strict'

const chalk = require('chalk')
const moment = require('moment')
const TogglClient = require('toggl-api')

const TOGGL_API_TOKEN = process.env.TOGGL_API_TOKEN
const toggl = new TogglClient({ apiToken: TOGGL_API_TOKEN })

const entries = new Map()

const startTimeEntry = () => {
  const today = moment().format('DD/MM/YYYY')
  const description = `${today}`

  toggl.startTimeEntry({ description }, (err, timeEntry) => {
    if (err) {
      console.error( err)
    }

    entries.set('timeEntry', timeEntry)
    console.log(chalk.yellow('started time entry', timeEntry))
  })
}

const stopTimeEntry = (id) => {
  if (!entries.get('timeEntry')) {
    return
  }

  toggl.stopTimeEntry(id, (err, timeEntry) => {
    if (err) {
      console.error(err)
    }

    entries.delete('timeEntry')
    console.log(chalk.yellow('stoped time entry', timeEntry))
  })
}

module.exports = {
  startTimeEntry,
  stopTimeEntry,
}
