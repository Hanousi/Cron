# Cron Parser - Hani Tawil

Tech task for my Deliveroo application. A command line application which takes a set of arguments and prints into the console
all the possible times that the command (provided as an argument) will be scheduled for.

## Getting Started

Simply unzip the file provided.

### Prerequisites

`Node` and `npm` is all you need installed on your machine to run and test the application

### Installing

* After extracting the zipped file cd into it
* run `npm install` to install all the needed module for running the application's tests
* To run the application:

```
node index.js */15 0 1,15 * 1-5 /usr/bin/find
```

## Running the tests

Automated tests can be run by simply calling `npm test` in the root of the directory.

Half of the tests cover the happy paths of the application and the other half test against the possible
unhappy paths that may occur and result in errors.

### Limitations and Assumptions

* Application assumes that every month has 31 days in it.
* Application does not handle for TEXT based inputs such as MON-SUN
* Application does not handle for special characters: L W C #
