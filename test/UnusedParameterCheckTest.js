var expect = require('chai').expect,
    JsCop = require(".."),
    UnusedParameterCheck = require("../lib").Checks.UnusedParameterCheck,
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("UnusedParameterCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find a simple unused parameter", function () {

        var code = codeFromFunction(function (x) {
        });

        expect(cop.analyse(code).hasViolation(UnusedParameterCheck)).to.be.true;

    });

    it("should not report an unused parameter for empty functions", function () {

        var code = codeFromFunction(function () {
        });

        expect(cop.analyse(code).hasViolation(UnusedParameterCheck)).to.be.false;

    });

    it("should have no violation if a sibling parameter is used", function () {

        var code = codeFromFunction(function (x, y) {
            // y is used, x is unused - no error
            return y;
        });

        expect(cop.analyse(code).hasViolation(UnusedParameterCheck)).to.be.false;

    });


    it("should have no violation if a sibling parameter is used - mixed", function () {

        var code = codeFromFunction(function (x, y, z, a) {
            return a;
        });

        expect(cop.analyse(code).hasViolation(UnusedParameterCheck)).to.be.false;

    });


    it("should have a violation if a sibling parameter is not used", function () {

        var code = codeFromFunction(function (x, y, z, a) {
            return x + y;
        });

        var analyse = cop.analyse(code);

        expect(analyse.hasViolation(UnusedParameterCheck)).to.be.true;
        expect(analyse.getViolations(UnusedParameterCheck)).to.have.length(2);


    });

    it("should have no violation if variable is used deeply nested", function () {

        var code = codeFromFunction(function (x) {

            (function() {
                (function () {
                    (function () {
                        (function () {
                            (function (y) {
                                return y;
                            })(x);
                        })()
                    })()
                })()

            })();

        });

        var analyse = cop.analyse(code);

        expect(analyse.hasViolation(UnusedParameterCheck)).to.be.false;


    });

});