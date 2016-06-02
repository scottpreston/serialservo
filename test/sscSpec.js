var SerialServoController = require("../lib/ssc.js");

describe("serial servo controller with no options has default values", function () {

    it("ssc should have logging enabled by default", function () {
        var ssc = new SerialServoController();
        expect(ssc.loggingEnabled).toBe(true);
    });
    it("ssc should have logging disabled by if passed into constructor", function () {
        var ssc = new SerialServoController({loggingEnabled: false});
        expect(ssc.loggingEnabled).toBe(false);
    });
});

describe("serial controller move functionality", function () {
    it("should pass specific bytes to the serial port with logging enabled", function () {
        var ssc = new SerialServoController();
        spyOn(ssc.serialPort, 'write');
        ssc.move(1, 2);
        expect(ssc.serialPort.write).toHaveBeenCalledWith([255, 1, 2]);
    });

    it("should pass specific bytes to the serial port with logging disabled", function () {
        var ssc = new SerialServoController({loggingEnabled: false});
        spyOn(ssc.serialPort, 'write');
        ssc.move(1, 2);
        expect(ssc.serialPort.write).toHaveBeenCalledWith([255, 1, 2]);
    });
});

describe("serial controller nav functionality", function () {

    it("should pass specific bytes to the serial port", function () {
        var ssc = new SerialServoController();
        spyOn(ssc, 'move');
        ssc.nav(1, 1);
        expect(ssc.move.calls.count()).toEqual(2);
    });
});

describe("serial controller timed move functionality", function () {

    it("call move twice", function () {
        var ssc = new SerialServoController();
        jasmine.clock().install();
        spyOn(ssc, 'move');
        ssc.timedMove(1, 1, 50);
        jasmine.clock().tick(100);
        expect(ssc.move.calls.count()).toEqual(2);
        jasmine.clock().uninstall();

    });
});

describe("serial controller timed navigation functionality", function () {

    it("should call move 4 times", function () {
        var ssc = new SerialServoController();
        jasmine.clock().install();
        spyOn(ssc, 'move');
        ssc.timedNav(1, 1, 50);
        jasmine.clock().tick(100);
        expect(ssc.move.calls.count()).toEqual(4);
        jasmine.clock().uninstall();

    });
});
