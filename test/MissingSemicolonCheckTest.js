var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("MissingSemicolonCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should not validate call expressions without semicolon", function () {

        var code = codeFromFunction(function () {
            alert()
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.MissingSemicolonCheck)).to.be.true;

    });

    it("should not validate statement without semicolon", function () {

        var code = codeFromFunction(function () {
            x = {}
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.MissingSemicolonCheck)).to.be.true;

    });


    it("should not generate a warning for a call expressions with semicolon", function () {

        var code = codeFromFunction(function () {
            alert();
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.MissingSemicolonCheck)).to.be.false;

    });

});