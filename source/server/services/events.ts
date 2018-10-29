import _ from 'lodash';
import path from 'path';

import { defineTimeDiff } from '../utils/dateUtils';
import { readFileAsJson } from '../utils/fileUtils';

function getServerWorkingTime(serverStartTime: number) {
  const { hours, minutes, seconds } = defineTimeDiff(
    serverStartTime,
    Date.now()
  );

  return `${hours}:${minutes}:${seconds}`;
}

async function getEvents(offset = 0, count: number, type: number) {
  const fileName = path.join(__dirname, '../database/events.json');
  const events = await readFileAsJson(fileName);
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

export default { getServerWorkingTime, getEvents };
