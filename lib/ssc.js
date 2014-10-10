"use strict";

var SerialPort = require("serialport").SerialPort;

var SerialServoController = function (options) {
    var options = options || {},
            portName = options.portName || "/dev/ttyUSB0",
            serialPortOptions = options.serialPortOptions || {
                baudrate: 9600
            };
    this.loggingEnabled = options.loggingEnabled || true;
    this.serialPort = new SerialPort(portName, serialPortOptions);
};

SerialServoController.prototype.move = function write(pin, pos) {
    var b = [255, pin, pos];
    this.serialPort.write(b);
    if (this.loggingEnabled) {
        console.log("serial port writing on pin=" + pin + ", position = " + pos);
    }
};

SerialServoController.prototype.timedMove = function write(pin, pos, timeout) {
    var that = this;
    that.move(pin, pos);
    setTimeout(function () {
        that.move(pin, 127);
    }, timeout);
};

SerialServoController.prototype.nav = function (left, right) {
    this.move(0, left);
    this.move(1, right);
};

SerialServoController.prototype.timedNav = function (left, right, timeout) {
    var that = this;
    that.nav(left, right);
    setTimeout(function () {
        that.nav(127, 127);
    }, timeout);
};

module.exports = SerialServoController;