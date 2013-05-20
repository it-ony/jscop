var expect = require('chai').expect,
    JsCop = require(".."),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("AlwaysUseCurlyBracesCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find missing curly braces for simple if", function () {

        var code = codeFromFunction(function () {
            if (1)
                console.log();
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should not has violation for simple if with curly braches", function () {

        var code = codeFromFunction(function () {
            if (1 === 2) {
                console.log();
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });

    it("should find missing curly braces for else", function () {

        var code = codeFromFunction(function () {
            if (1) {
                console.log("if");
            } else
                console.log("else");
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should handle if and else correctly", function () {

        var code = codeFromFunction(function () {
            if (1) {
                console.log("if");
            } else {
                console.log("else");
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });


});