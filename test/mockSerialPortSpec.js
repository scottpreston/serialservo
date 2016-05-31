var mockSerialPort = require("../lib/mockSerialPort.js");

describe("a mock serial servo controller should act like a serial port", function () {
    var mock = new mockSerialPort();
    it("a serial port should have a write method", function () {
        expect(mock.write).toBeDefined();
    });
});