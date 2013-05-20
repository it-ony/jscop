var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("DuplicatePropertyCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find duplicate properties in object", function () {

        var code = codeFromFunction(function () {
            x = {
                x: 1,
                y: 1,
                y: null
            };
        });

        expect(cop.analyse(code).hasVialotions(Index.Checks.DuplicatePropertyNameCheck)).to.be.true;

        code = codeFromFunction(function () {
            x = {
                x: 1,
                "x": 1,
                y: 2
            };
        });

        expect(cop.analyse(code).hasVialotions(Index.Checks.DuplicatePropertyNameCheck)).to.be.true;

    });

    it("should not generate a warning for non-duplicate properties in object", function () {

        var code = codeFromFunction(function () {
            x = {
                x: 1,
                y: 1
            };
        });

        expect(cop.analyse(code).hasVialotions(Index.Checks.DuplicatePropertyNameCheck)).to.be.false;

    });

    it("empty object", function () {

        var code = codeFromFunction(function () {
            x = {
            };
        });

        expect(cop.analyse(code).hasVialotions(Index.Checks.DuplicatePropertyNameCheck)).to.be.false;

    });

});