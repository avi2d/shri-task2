const _ = require('lodash');
const path = require('path');

const { readFileAsJson } = require('../utils/fileUtils');

async function getDevices(offset = 0, count, type) {
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

async function getFilters(offset = 0, count) {
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

module.exports = {
  getDevices,
  getFilters,
};
