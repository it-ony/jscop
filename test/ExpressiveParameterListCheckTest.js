var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("ExpressiveParameterListCheckTest", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find too many parameters", function () {

        var code = codeFromFunction(function () {
            foo(1, 2, 3, 4, 5, 6, 7, 8);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ExcessiveParameterListCheck)).to.be.true;

        cop = new JsCop({
            excessiveParameterListCheck: {
                maxFunctionParameters: 2
            }
        });

        code = codeFromFunction(function () {
            foo(1, 2, 3);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ExcessiveParameterListCheck)).to.be.true;

    });

    it("should not find too many parameters for excluded functions", function () {

        cop = new JsCop({
            excessiveParameterListCheck: {
                excludeFunctions: ["define"]
            }
        });

        var code = codeFromFunction(function () {
            define(1, 2, 3, 4, 5, 6, 7, 8);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ExcessiveParameterListCheck)).to.be.false;

    });

    it("should not find too many parameters", function () {

        var code = codeFromFunction(function () {
            foo(1, 2, 3);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ExcessiveParameterListCheck)).to.be.false;

        cop = new JsCop({
            excessiveParameterListCheck: {
                maxFunctionParameters: 2
            }
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ExcessiveParameterListCheck)).to.be.true;


    });


});