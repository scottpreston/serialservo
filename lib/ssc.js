"use strict";

var SerialPort = require('serialport').SerialPort;
var MockSerialPort = require('mock-serialport');
var fileExists = require('file-exists');

var SerialServoController = function (options) {
    var options = options || {},
        portName = options.portName || "/dev/ttyUSB0",
        serialPortOptions = options.serialPortOptions || {
                baudrate: 9600
            };
    this.loggingEnabled = true;
    if (options.loggingEnabled == false) {
        this.loggingEnabled = false;
    }
    this.leftMotor = options.leftMotor || 0;
    this.rightMotor = options.rightMotor || 1;
    if (fileExists(portName)) {
        this.serialPort = new SerialPort(portName, serialPortOptions);
    } else {
        console.log('Port "' + portName + '" does not exist locally, using Mock Serial Port.')
        this.serialPort = new MockSerialPort();
    }
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
    this.move(this.leftMotor, left);
    this.move(this.rightMotor, right);
};

SerialServoController.prototype.timedNav = function (left, right, timeout) {
    var that = this;
    that.nav(left, right);
    setTimeout(function () {
        that.nav(127, 127);
    }, timeout);
};

module.exports = SerialServoController;