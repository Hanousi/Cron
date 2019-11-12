const parser = require('./cron_parser')

// Maps the gathered arguments to the correct time field
const crons = new Map([
  ["minutes", process.argv[2]],
  ["hours", process.argv[3]],
  ["dayOfMonth", process.argv[4]],
  ["month", process.argv[5]],
  ["dayOfWeek", process.argv[6]],
  ["command", process.argv[7]]
]);

console.log(parser.parse(crons))
