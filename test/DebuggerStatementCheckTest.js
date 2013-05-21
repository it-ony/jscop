var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("DebuggerStatementCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should not validate with debugger statement", function () {

        var code = codeFromFunction(function () {
            debugger;
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.DebuggerStatementCheck)).to.be.true;

    });


});