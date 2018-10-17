const _ = require('lodash');
const path = require('path');

const { defineTimeDiff } = require('../utils/dateUtils');
const { readFileAsJson } = require('../utils/fileUtils');

function getServerWorkingTime(serverStartTime) {
  const { hours, minutes, seconds } = defineTimeDiff(
    serverStartTime,
    Date.now()
  );

  return `${hours}:${minutes}:${seconds}`;
}

function getEvents(offset = 0, count, type) {
  const fileName = path.join(__dirname, '../database/events.json');
  const events = readFileAsJson(fileName);
  const totalCount = events.length;

  let filteredEvents = type ? _.filter(events, { type }) : events;

  if (offset > 0) {
    filteredEvents = _.drop(filteredEvents, offset);
  }

  if (count > 0) {
    filteredEvents = _.take(filteredEvents, count);
  }

  return {
    data: filteredEvents,
    total: totalCount
  };
}

module.exports = {
  getServerWorkingTime,
  getEvents
};
