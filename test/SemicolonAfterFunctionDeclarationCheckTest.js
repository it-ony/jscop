var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("SemicolonAfterFunctionDeclarationCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should detect semicolon after function declaration", function () {

        var code = codeFromFunction(function () {
            function foo() {

            };

        });

        expect(cop.analyse(code).hasViolation(Index.Checks.SemicolonAfterFunctionDeclarationCheck)).to.be.true;

    });

    it("should detect semicolon after function declaration also with spaces", function () {

        var code = codeFromFunction(function () {
            function foo() {

            }

            ;

        });

        expect(cop.analyse(code).hasViolation(Index.Checks.SemicolonAfterFunctionDeclarationCheck)).to.be.true;

    });

    it("should not detect semicolon after function declaration", function () {

        var code = codeFromFunction(function () {
            function foo() {
            }
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.SemicolonAfterFunctionDeclarationCheck)).to.be.false;

    });

});