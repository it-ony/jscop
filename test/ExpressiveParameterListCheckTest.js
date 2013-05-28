var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("EmptyStatementCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find too many parameters", function () {

        var code = codeFromFunction(function () {
            foo(1, 2, 3, 4, 5, 6, 7, 8);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ExcessiveParameterListCheck)).to.be.true;

    });

    it("should not find too many parameters", function () {

        var code = codeFromFunction(function () {
            foo(1, 2, 3);
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ExcessiveParameterListCheck)).to.be.false;

    });


});