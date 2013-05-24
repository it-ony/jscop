var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("EmptyStatementCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should not validate with empty statements", function () {

        var code = codeFromFunction(function () {
            ;
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.EmptyStatementCheck)).to.be.true;


        code = codeFromFunction(function () {
            console.log();;
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.EmptyStatementCheck)).to.be.true;

    });

});