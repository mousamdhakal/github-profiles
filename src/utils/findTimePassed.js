/**
 * Takes a time and returns the time passed since that time till now in easy to read format
 * @param {Date} startTime
 */

function findTimePassed(startTime) {
  startTime = new Date(startTime);
  let parsedStartTime = Date.parse(startTime);
  let endTime = new Date();
  parsedStartTime = Math.floor(parsedStartTime / 1000);
  endTime = Math.floor(endTime.getTime() / 1000);
  let seconds = endTime - parsedStartTime;

  if (seconds < 60) {
    return 'Updated ' + seconds + ' seconds ago';
  }
  let minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return 'Updated ' + minutes + ' minutes ago';
  }
  let hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return 'Updated ' + hours + ' hours ago';
  }
  let days = Math.floor(hours / 24);
  if (days < 8) {
    return 'Updated ' + days + ' days ago';
  }
  let day = startTime.getDate();
  let month = startTime.toLocaleString('default', { month: 'short' });
  if (days < 365) {
    return `Updated on ${day} ${month}`;
  }
  if (days > 365) {
    let year = startTime.getFullYear();
    return `Updated on ${month} ${day}, ${year}`;
  }
}

export default findTimePassed;
