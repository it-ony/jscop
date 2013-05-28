var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("NamedFunctionExpressionCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should not validate with named function expressions", function () {

        var code = codeFromFunction(function () {
            var x = function foo() {
            };
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.NamedFunctionExpressionCheck)).to.be.true;

    });

    it("should validate with anonymous function expressions", function () {

        var code = codeFromFunction(function () {
            var x = function () {
            };
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.NamedFunctionExpressionCheck)).to.be.false;

    });


    it("should have no violation for function declarations", function () {

        var code = codeFromFunction(function () {
            function foo() {
            }
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.NamedFunctionExpressionCheck)).to.be.false;

    });

});