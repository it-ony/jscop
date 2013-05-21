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
            eval();
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.EvalCheck)).to.be.true;

    });


});