var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction,
    VariableNameCheck = Index.Checks.VariableNameCheck;

describe("VariableNameCheckTest", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find variables not validating against the name schema", function () {

        var code = codeFromFunction(function () {
            var öas;
        });

        expect(cop.analyse(code).hasViolation(VariableNameCheck)).to.be.true;

    });

    it("should respect custom variable name schema", function () {

        cop = new JsCop({
            variableNameCheck: {
                name: /^[äöü][a-z]*$/
            }
        });

        var code = codeFromFunction(function () {
            var ä;
        });

        expect(cop.analyse(code).hasViolation(VariableNameCheck)).to.be.false;

        code = codeFromFunction(function () {
            var äA;
        });

        expect(cop.analyse(code).hasViolation(VariableNameCheck)).to.be.true;

    });

    it("should validate FunctionExpressions against functionName regular expression", function () {

        var code = codeFromFunction(function () {
            var Foo = function() {
            };
        });

        expect(cop.analyse(code).hasViolation(VariableNameCheck)).to.be.false;

        code = codeFromFunction(function () {
            var Foo;
        });

        expect(cop.analyse(code).hasViolation(VariableNameCheck)).to.be.true;

    });

});