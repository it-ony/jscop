var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("AstAnalysisTest.js", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("parameter list should be initialized and checked", function () {

        var code = codeFromFunction(function () {
            foo(function() {
                debugger;
            });
        });

        expect(cop.analyse(code).hasViolation()).to.be.true;

    });


});