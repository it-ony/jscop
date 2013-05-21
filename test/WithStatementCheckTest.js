var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("WithStatementCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should not validate with 'with' statement", function () {

        var code = codeFromFunction(function () {
            with(x)
                console.log();
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.WithStatementCheck)).to.be.true;

    });


});