# serialservo

This module will allow for using the serial servo controller via a serial port. 

If you don't have a serial port on your machine you, this will add a mock serial port for you so you can still run your test. 
Because this port just uses the write method of the serial port, the mock serial port just uses that.

## Install

```bash
npm install
```

## Testing

```bash
npm install
npm install istanbul -g
npm test
npm run coverage
```


## Typical Usage

These have default options for the portName = /dev/ttyUSB0, and baudrate = 9600, enabledLogging = true.

```javascript
var SerialServo = require("serialservo");
var ssc = new SerialServo(); // default
ssc.move(0,100); // move pin 0 to position 100
ssc.nav(100,100); // send multiple bytes to pins 0 and 1 to positions 100
ssc.timedMove(0,100,100); // send move pin 0 to position 100 for 100ms, then back to 127
ssc.timedNav(100,100,100); // send multiple bytes to pins 0 and 1 to position 100 for 100ms, then back to 127
```

## Serial Servo Controller Protocol

This npm utilizes the 3-byte protocol popularized by the Scott Edwards Mini-SSC2. You can view the entire PDF in the docs/ directory of this project.

The protocol itself consist of 3 bytes in the format [255,pin,pos]

* pin - generally from 0-7 or 0-31 based on the size of your controller.
* pos - from 0-255, where 0 would be 0 degrees and 255 would coorespond to 180 degrees on a 0-180 degree servo.

## Example Servo Controllers

Just google the term "serial servo controller" you will find a lot of products.

You can visit sites:

* http://www.pololu.com/
* http://www.lynxmotion.com/
* https://www.sparkfun.com

## Cusomized Usage

Alternatively you can add options to the serialservo constructor for the port name or the serial port parameters.

```javascript
var SerialServo = require("serialservo");
var ssc = new SerialServo({
    portName: "/dev/tty1",
    serialPortOptions: {baudrate:19200},
    enableLogging: false
    });
ssc.move(0,100); // move pin 0 to position 100
```

## License

The MIT License (MIT)

Copyright (c) 2014-16 Scott Preston

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
