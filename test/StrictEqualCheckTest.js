var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("MissingSemicolonCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find non strict equal calls == ", function () {

        var code = codeFromFunction(function () {
            var x = (true == false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.true;

    });

    it("should find non strict equal calls != ", function () {

        var code = codeFromFunction(function () {
            var x = (true != false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.true;

    });

    it("should non find violation for >=, <=, ===, !== ", function () {

        var code = codeFromFunction(function () {
            var x = (true === false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.false;

        code = codeFromFunction(function () {
            var x = (true !== false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.false;

        code = codeFromFunction(function () {
            var x = (true >= false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.false;

        code = codeFromFunction(function () {
            var x = (true <= false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.false;

        code = codeFromFunction(function () {
            var x = (true > false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.false;

        code = codeFromFunction(function () {
            var x = (true < false);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.StrictEqualCheck)).to.be.false;

    });


});