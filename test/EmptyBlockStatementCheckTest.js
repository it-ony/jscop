var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("EmptyStatementCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should detect empty blocks", function () {

        var code = codeFromFunction(function () {
            {}
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.EmptyBlockStatementCheck)).to.be.true;

    });

    it("should not detect trailing comma checks in arrays", function () {

        var code = codeFromFunction(function () {
            var x = {};
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.EmptyBlockStatementCheck)).to.be.false;

    });

});