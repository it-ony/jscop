var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction,
    GlobalLeakCheck = Index.Checks.GlobalLeakCheck;

describe("GlobalLeakCheckTest", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find global leaks in simple expression statements", function () {

        var code = codeFromFunction(function () {
            x;
        });

        expect(cop.analyse(code).hasViolation(GlobalLeakCheck)).to.be.true;

    });

    it("should not find global leaks if declared as function parameter", function () {

        var code = codeFromFunction(function () {

            function abc(x) {
                function xyz() {
                    x++;
                }
            }

        });

        expect(cop.analyse(code).hasViolation(GlobalLeakCheck)).to.be.false;

    });

    it("should not find global leaks if declared as function parameter II", function () {

        var code = codeFromFunction(function () {

            var abc = function (x) {
                (function () {
                    x++
                })();
            }

        });

        expect(cop.analyse(code).hasViolation(GlobalLeakCheck)).to.be.false;

    });

    it("should find global leaks in function calls", function () {

        var code = codeFromFunction(function () {

            (function () {
                (function (x) {

                })(y);
            })()

        });

        expect(cop.analyse(code).hasViolation(GlobalLeakCheck)).to.be.true;

    });

    it("should not report leaks if identifier is a named function", function () {

        var code = codeFromFunction(function () {

            (function(a) {
            })(xyz);

            function xyz() {
            }

        });

        expect(cop.analyse(code).hasViolation(GlobalLeakCheck)).to.be.false;


    });

    it.skip("should not report leaks if identifier is a named function", function () {

        var code = codeFromFunction(function () {

            window && window.addEventListener;

        });

        expect(cop.analyse(code).hasViolation(GlobalLeakCheck)).to.be.true;


    });

});