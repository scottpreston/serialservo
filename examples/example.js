var SerialServo = require("../lib/ssc.js"); // replace with serialservo
var sleep = require('sleep');
var ssc = new SerialServo({
    portName: "/dev/USBtty1",
    serialPortOptions: {baudrate: 9600},
    enableLogging: false
});

console.log('basic move');
ssc.move(2, 100); // move pin 0 to position 100
sleep.sleep(1);

console.log('timed move');
ssc.timedMove(3, 100, 50); // same as above but reset after 1sec
sleep.sleep(1);

console.log('basic nav');
ssc.nav(100, 100); // moves pins 0,1 to 100
sleep.sleep(1);

console.log('timed nav');
ssc.timedNav(100, 100, 50); // same as above but reset after 1sec