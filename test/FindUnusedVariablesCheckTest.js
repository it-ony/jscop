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

    it("should not find a var as unused if variable is used in function call", function () {

        var code = codeFromFunction(function () {
            var x;
            (function() {})(x);
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
            })(x+1);
        });

        expect(cop.analyse(code).hasViolation(FindUnusedVariablesCheck)).to.be.false;

    });



});