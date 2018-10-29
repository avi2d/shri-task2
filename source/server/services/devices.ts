import _ from 'lodash';
import path from 'path';

import { readFileAsJson } from '../utils/fileUtils';

async function getDevices(offset = 0, count: number, type: number) {
  const fileName = path.join(__dirname, '../database/devices.json');
  const devices = await readFileAsJson(fileName);
  const totalCount = devices.length;

  let filteredDevices = type ? _.filter(devices, { type }) : devices;

  if (offset > 0) {
    filteredDevices = _.drop(filteredDevices, offset);
  }

  if (count > 0) {
    filteredDevices = _.take(filteredDevices, count);
  }

  return {
    data: filteredDevices,
    total: totalCount
  };
}

async function getFilters(offset = 0, count: number) {
  const fileName = path.join(__dirname, '../database/filters.json');
  let filters = await readFileAsJson(fileName);
  const totalCount = filters.length;

  if (offset > 0) {
    filters = _.drop(filters, offset);
  }

  if (count > 0) {
    filters = _.take(filters, count);
  }

  return {
    data: filters,
    total: totalCount
  };
}

export default {
  getDevices,
  getFilters
};
