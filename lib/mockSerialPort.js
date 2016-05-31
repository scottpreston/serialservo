var MockSerialPort = function () {
};

MockSerialPort.prototype.write = function (bytes) {
    console.log(new Date().getTime(), 'MockSerialPort to write: ', bytes);
}

module.exports = MockSerialPort;