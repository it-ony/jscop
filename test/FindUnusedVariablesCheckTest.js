var expect = require('chai').expect,
    JsCop = require(".."),
    FindUnusedVariablesCheck = require("../lib").Checks.FindUnusedVariablesCheck,
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("FindUnusedVariablesCheckTest", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find a simple unused variable", function () {

        var code = codeFromFunction(function () {
            var x;
        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.true;

    });

    it("should find a one of two unused variable", function () {

        var code = codeFromFunction(function () {
            var x,
                y;

            (function () {
            })(x);
        });

        var analyse = cop.analyse(code);
        expect(analyse.hasViolation(FindUnusedVariablesCheck)).to.be.true;

        var violations = analyse.getViolations(FindUnusedVariablesCheck);
        expect(violations).to.have.length(1);
        expect(violations[0].node.name).to.eql("y");

    });

    it("should not find a var as unused if variable is used in function call", function () {

        var code = codeFromFunction(function () {
            var x;
            (function () {
            })(x);
        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.false;

    });

    it("should not find a var as unused if variable is used in update expression", function () {

        var code = codeFromFunction(function () {
            var x = 0;
            (function () {
            })(++x);
        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.false;

    });

    it("should not find a var as unused if variable is used in binary expression", function () {

        var code = codeFromFunction(function () {
            var x;
            (function () {
            })(x + 1);
        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.false;

    });

    it("should not find a var as unused it is used in some nested scopes", function () {

        var code = codeFromFunction(function () {
            var x;

            function y() {
                (function () {
                })(x);
            }

        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.false;

    });

    it("should not find a var as unused it is used in some nested scopes", function () {

        var code = codeFromFunction(function () {

            var a;
            a++;

        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.false;

    });

    it("should not find a var assignment, that is used", function () {
        var code = codeFromFunction(function () {
            var child = {};

            if (child.foo) {
            }

        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.false;
    });


});