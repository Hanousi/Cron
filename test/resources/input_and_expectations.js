exports.simple = new Map([
  ["input", new Map([
    ["minutes", "0"],
    ["hours", "1"],
    ["dayOfMonth", "2"],
    ["month", "3"],
    ["dayOfWeek", "4"],
    ["command", "/usr/bin/find"]
  ])],
  ["expected", "minute\t\t0\nhour\t\t1\nday of month\t2\nmonth\t\t3\nday of week\t4\ncommand\t\t/usr/bin/find"]
]);

exports.dashes = new Map([
  ["input", new Map([
    ["minutes", "0-4"],
    ["hours", "1-13"],
    ["dayOfMonth", "2-4"],
    ["month", "3-7"],
    ["dayOfWeek", "4-5"],
    ["command", "/usr/bin/find"]
  ])],
  ["expected", "minute\t\t0 1 2 3 4\nhour\t\t1 2 3 4 5 6 7 8 9 10 11 12 13\nday of month\t2 3 4\nmonth\t\t3 4 5 6 7\nday of week\t4 5\ncommand\t\t/usr/bin/find"]
]);

exports.lists = new Map([
  ["input", new Map([
    ["minutes", "0,4"],
    ["hours", "1,13,15"],
    ["dayOfMonth", "2,4,6,12"],
    ["month", "3,7,8,10,12"],
    ["dayOfWeek", "4,5,6"],
    ["command", "/usr/bin/find"]
  ])],
  ["expected", "minute\t\t0 4\nhour\t\t1 13 15\nday of month\t2 4 6 12\nmonth\t\t3 7 8 10 12\nday of week\t4 5 6\ncommand\t\t/usr/bin/find"]
]);

exports.astericks = new Map([
  ["input", new Map([
    ["minutes", "*"],
    ["hours", "*"],
    ["dayOfMonth", "*"],
    ["month", "*"],
    ["dayOfWeek", "*"],
    ["command", "/usr/bin/find"]
  ])],
  ["expected", "minute\t\t0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59\nhour\t\t0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23\nday of month\t1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31\nmonth\t\t1 2 3 4 5 6 7 8 9 10 11 12\nday of week\t0 1 2 3 4 5 6\ncommand\t\t/usr/bin/find"]
]);

exports.increments = new Map([
  ["input", new Map([
    ["minutes", "0/5"],
    ["hours", "2/3"],
    ["dayOfMonth", "4/6"],
    ["month", "*/4"],
    ["dayOfWeek", "3/2"],
    ["command", "/usr/bin/find"]
  ])],
  ["expected", "minute\t\t0 5 10 15 20 25 30 35 40 45 50 55\nhour\t\t2 5 8 11 14 17 20 23\nday of month\t4 10 16 22 28\nmonth\t\t1 5 9\nday of week\t3 5\ncommand\t\t/usr/bin/find"]
]);

exports.incrementsWithDashes = new Map([
  ["input", new Map([
    ["minutes", "0"],
    ["hours", "4-20/2"],
    ["dayOfMonth", "20-30/3"],
    ["month", "4"],
    ["dayOfWeek", "2"],
    ["command", "/usr/bin/find"]
  ])],
  ["expected", "minute\t\t0\nhour\t\t4 6 8 10 12 14 16 18 20\nday of month\t20 23 26 29\nmonth\t\t4\nday of week\t2\ncommand\t\t/usr/bin/find"]
]);

exports.questionMarkError = new Map([
    ["minutes", "?"],
    ["hours", "4-20/2"],
    ["dayOfMonth", "20-30/3"],
    ["month", "4"],
    ["dayOfWeek", "2"],
    ["command", "/usr/bin/find"]
  ])

exports.outOfRangeError = new Map([
    ["minutes", "0"],
    ["hours", "24"],
    ["dayOfMonth", "20-30/3"],
    ["month", "4"],
    ["dayOfWeek", "2"],
    ["command", "/usr/bin/find"]
  ])

exports.outOfRangeError1 = new Map([
    ["minutes", "0"],
    ["hours", "24"],
    ["dayOfMonth", "20-32/3"],
    ["month", "4"],
    ["dayOfWeek", "2"],
    ["command", "/usr/bin/find"]
  ])

exports.outOfRangeError2 = new Map([
    ["minutes", "0,20,40,59,65"],
    ["hours", "24"],
    ["dayOfMonth", "20-32/3"],
    ["month", "4"],
    ["dayOfWeek", "2"],
    ["command", "/usr/bin/find"]
  ])

exports.outOfRangeError3 = new Map([
    ["minutes", "0,20,40,59"],
    ["hours", "24"],
    ["dayOfMonth", "0-7"],
    ["month", "4"],
    ["dayOfWeek", "2"],
    ["command", "/usr/bin/find"]
  ])

exports.incorrectNumberOfArguments  = new Map([
    ["minutes", "0,20,40,59"],
    ["hours", "24"],
    ["dayOfMonth", "0-7"],
    ["month", "4"],
    ["dayOfWeek", "/usr/bin/find"],
    ["command", null]
  ])
