// Hani Tawil, Deliveroo technial task

// Maps the expectations of mins and maxs for each time field
const totals = new Map([
  ["minutes", [0, 59]],
  ["hours", [0, 23]],
  //asumption
  ["dayOfMonth", [1, 31]],
  ["month", [1, 12]],
  ["dayOfWeek", [0,6]]
]);

/**
 *  Creates a space seperated list which increments by a given value
 *
 *  Params:
 *    start:      The value in which is start incrementing from
 *    finish:     Parameter used to find the max value to increment to.
 *    increments: How much to increment by every turn of the loop
 */
function createList(start, finish, increments) {
  var result = [];


  for(var i = parseInt(start); i <= parseInt(finish); i += parseInt(increments)) {
    result.push(i);
  };

  return result.toString().replace(/,/g, ' ');
};

/**
 *  When an argument contains a slash we reuse the createList function but change
 *  incrementer paramter to whatever is the denominator of the slash.
 *  Function is also able to handle when hyphens are used for the numerator.
 *
 *  Params:
 *    key:      The name of the time field to make sure to test against the
 *              correct range and when a hyphen isn't used as the final int to
 *              increment to
 *    value:    Cron formatted string used to pull the numerator and denominator
 */
function handleSlash(key, value) {
  const split = value.split('/');
  var offset = (split[0] == "*" || split[0] == "?") ? totals.get(key)[0] : split[0];
  var finish = totals.get(key)[1];

  if(split[0].includes("-")) {
    const range = split[0].split('-');
    offset = range[0];
    finish = range[1];
  };

  const denominator = split[1];

  isInRange(key, offset);
  isInRange(key, finish);

  return createList(offset, finish, denominator);
};

/**
 *  When an argument contains a comma simply replace the commas with a period
 *  and return that string. Also make sure that every value in that new string
 *  is within the correct time field range
 *
 *  Params:
 *    key:      The name of the time field to make sure to test against the
 *              correct range
 *    value:    Comma separated list to be converted into a period separated list
 */
function handleCommas(key, value) {
  const result = value.replace(/,/g, ' ');
  const forRangeCheck = result.split(' ');

  forRangeCheck.forEach((int) => {
    isInRange(key, int);
  });

  return result;
};

/**
 *  When an argument contains a hyphen. If both values are within range a space
 *  seperated list is generated between the 2 numbers
 *
 *  Params:
 *    key:      The name of the time field to make sure to test against the
 *              correct range
 *    value:    The value to test against the range and to create the list
 */
function handleHyphens(key, value) {
  const values = value.split("-");

  values.forEach((value) => {
    isInRange(key, value);
  });

  return createList(values[0], values[1], 1);
};

/**
 *  Checks to see whether or not the values provided are in range of the given
 *  time field.
 *
 *  Params:
 *    key:      The name of the time field to make sure to test against the
 *              correct range
 *    value:    The value to test against the range.
 *
 *  Throws:
 *    Error: "Number used in `key` field is out of range"
 */
function isInRange(key, value) {
  const int = parseInt(value);
  const limits = totals.get(key);

  if (int < limits[0] || int > limits[1]) {
    throw new Error("Number used in " + key + " field is out of range");
  };
};

/**
 *  Checks to see if any of the crons provided are undefined. If so one of the
 *  one the arguments are missing. Also if the map is any larger than expected
 *  the same error is thrown
 *
 *  Params:
 *    crons:      Map of time field field name to value in standard cron format.
 *
 *  Throws:
 *    Error: Incorrect number of arguments provided
 */
function argumentCheck(crons) {
  crons.forEach((value, key) => {
    if (!value) {
      throw new Error("Incorrect number of arguments provided");
    };
  });
};

/**
 *  Takes the final results of each time field and generates a string formatted
 *  for printing.
 */
function generateResults(minutes, hours, daysOfMonth, months, daysOfWeek, command) {
  return "minute\t\t" + minutes +
    "\nhour\t\t" + hours +
    "\nday of month\t" + daysOfMonth +
    "\nmonth\t\t" + months +
    "\nday of week\t" + daysOfWeek +
    "\ncommand\t\t" + command;
};

/**
 *  Cron script entry point. Iterates over arguments
 *  map 'crons' to take inputs and convert them into
 *  space-separated lists for output then returns a
 *  string fit for printing.
 *
 *  Params:
 *    crons:      Map of time field field name to value in standard cron format.
 *
 * Throws:
 *    Error:      Question mark syntax used in incorrect field
 */
exports.parse = function(crons) {
  argumentCheck(crons);

  crons.forEach(function(value, key) {
    if (value.includes("/") && key != "command") {
      crons.set(key, handleSlash(key, value));
    } else if (value.includes(",")) {
      crons.set(key, handleCommas(key, value));
    } else if (value.includes("-")) {
      crons.set(key, handleHyphens(key, value));
    } else if (value.includes("*")) {
      const myTotals = totals.get(key);

      crons.set(key, createList(myTotals[0], myTotals[1], 1));
    } else if (value.includes("?")) {
      if (key == "dayOfWeek" || key == "dayOfMonth") {
        const myTotals = totals.get(key);

        crons.set(key, createList(myTotals[0], myTotals[1], 1));
      } else {
        throw new Error("Question mark syntax used in incorrect field");
      }
    } else if (key != "command") {
      isInRange(key, value);
    };
  });

  return generateResults(crons.get("minutes"),
    crons.get("hours"),
    crons.get("dayOfMonth"),
    crons.get("month"),
    crons.get("dayOfWeek"),
    crons.get("command"));
};
