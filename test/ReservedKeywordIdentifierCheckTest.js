var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction,
    ReservedKeywordIdentifier = Index.Checks.ReservedKeywordIdentifierCheck;

describe("ReservedKeywordIdentifierTest", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find reserved keyword identifier in variable declarations", function () {

        var code = codeFromFunction(function () {
            var public;
        });

        expect(cop.analyse(code).hasViolation(ReservedKeywordIdentifier)).to.be.true;

    });

    it("should not find non reserved keyword identifier in variable declarations", function () {

        var code = codeFromFunction(function () {
            var x;
        });

        expect(cop.analyse(code).hasViolation(ReservedKeywordIdentifier)).to.be.false;

    });

    it("should find reserved keyword identifier in FunctionDeclaration", function () {

        var code = codeFromFunction(function () {
            function public() {
            }
        });

        expect(cop.analyse(code).hasViolation(ReservedKeywordIdentifier)).to.be.true;

    });

    it("should not find non reserved keyword identifier in FunctionDeclaration", function () {

        var code = codeFromFunction(function () {
            function x() {
            }
        });

        expect(cop.analyse(code).hasViolation(ReservedKeywordIdentifier)).to.be.false;

    });

    it("should find reserved keyword identifier in parameter list", function () {

        var code = codeFromFunction(function () {
            function x(public) {
            }
        });

        expect(cop.analyse(code).hasViolation(ReservedKeywordIdentifier)).to.be.true;

    });

    it("should not find non reserved keyword identifier in parameter list", function () {

        var code = codeFromFunction(function () {
            function x(x) {
            }
        });

        expect(cop.analyse(code).hasViolation(ReservedKeywordIdentifier)).to.be.false;

    });

});