var expect = require('chai').expect,
    JsCop = require(".."),
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

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should not generate a warning for a call expressions with semicolon", function () {

        var code = codeFromFunction(function () {
            alert();
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });

});