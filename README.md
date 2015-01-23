# winston-google

A [Winston][1] transport for use on the [Google Cloud Platform][2].

## Usage

A winston-google transport can be constructed and supplied as one
of the transports for a [Winston][1] logger.

    var winston = require('winston');
    var winston_google = require('winston-google');

    var logger = new (winston.Logger)({
      transports: [ new (winston_google.Transport)() ]
    };

The constructor takes an `options` hash that can contain one of the
the following values:

  - *level* : Level of the mesages that this transport should log. Defaults to "debug"
  - *maxsize* : Max size, in bytes, of the logfile. If the size is exceeded then a new file is created.
  - *maxFiles* : Limit the number of files created when the size of the logfile is exceeded.

[1]: https://www.npmjs.com/package/winston
[2]: https://cloud.google.com/
[3]: https://console.developers.google.com
