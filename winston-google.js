var winston = require('winston');
var util = require('util');

var File = winston.transports.File;

/**
 * Return the current timestamp in nanoseconds as a string.
 *
 * @return the timestamp, e.g. "1416000321640929306".
 */
function timestampNs() {
  var millis = new Date().getTime();
  var nanos = ('000000' + process.hrtime()[1].toString()).substr(-6);
  return millis + nanos;
}

/*
 * Translation table from winston log levels to App Engine ones.
 */
var logLevelTranslation = {
  'silly': 'DEBUG',
  'debug': 'DEBUG',
  'info': 'INFO',
  'warn': 'WARNING',
  'error': 'ERROR'
};

/**
 * Convert a winston log record to a JSON-formatted string.
 *
 * @param {!Object} logRecord winston log record
 * @return {!string} the resulting string
 */
function stringify(logRecord) {
  var message = logRecord.message.replace('"', '\\"');
  var level = logLevelTranslation[logRecord.level] || 'INFO';
  var a = [
    '{',
    '"timeNanos": ',
    logRecord.timestamp,
    ', ',
    '"message": "',
    message,
    '", ',
    '"severity": "',
    level,
    '", ',
    '"thread": 0',
    '}'
  ];
  return a.join('');
};

/**
 * @param {?Object} options record
 */
var GoogleTransport = exports.Transport = function (options) {
  options = options || {};
  File.call(this, {
    filename: '/var/log/app_engine/app.log.json',
    level: options.level || 'debug',
    json: true,
    timestamp: timestampNs,
    stringify: stringify,
    maxFiles: options.maxFiles || null,
    maxsize: options.maxsize || null,
   });
};
util.inherits(GoogleTransport, File);

