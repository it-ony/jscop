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

    it("should not validate variable statement without semicolon", function () {

        var code = codeFromFunction(function () {
            var x
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.MissingSemicolonCheck)).to.be.true;

    });

    it("semicolon in var statement should be ok", function () {

        var code = codeFromFunction(function () {
            var x;
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.MissingSemicolonCheck)).to.be.false;

    });


    it("should not generate a warning for a call expressions with semicolon", function () {

        var code = codeFromFunction(function () {
            alert();
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.MissingSemicolonCheck)).to.be.false;

    });
//
//    it("should not generate a warning for combined statements", function () {
//
//        var code = codeFromFunction(function () {
//            var x = foo(),
//                y = 2;
//        });
//
//        expect(cop.analyse(code).hasViolation(Index.Checks.MissingSemicolonCheck)).to.be.false;
//
//    });

});