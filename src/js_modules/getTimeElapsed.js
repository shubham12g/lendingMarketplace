const timeElapsed = (grantDate) => {
  const dateGranted = new Date(grantDate);
  const currDate = new Date(Date.now());

  const grantDateMs = dateGranted.getTime();
  const currDateMs = currDate.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  const elapsedTime = currDateMs - grantDateMs;

  return Math.round(elapsedTime / oneDay);
};

export default timeElapsed;
