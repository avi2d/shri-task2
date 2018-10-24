function defineTimeDiff(first, second) {
  let delta = Math.abs(second - first) / 1000;

  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  const seconds = Math.floor(delta % 60);

  return { hours, minutes, seconds };
}

module.exports = { defineTimeDiff };
