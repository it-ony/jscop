var expect = require('chai').expect,
    JsCop = require(".."),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("AlwaysUseCurlyBracesCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should find missing curly braces for simple if", function () {

        var code = codeFromFunction(function () {
            if (1)
                console.log();
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should not has violation for simple if with curly braces", function () {

        var code = codeFromFunction(function () {
            if (1 === 2) {
                console.log();
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });

    it("should find missing curly braces for else", function () {

        var code = codeFromFunction(function () {
            if (1) {
                console.log("if");
            } else
                console.log("else");
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should handle if and else correctly", function () {

        var code = codeFromFunction(function () {
            if (1) {
                console.log("if");
            } else {
                console.log("else");
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });

    it("should find missing curly braces for if else", function () {

        var code = codeFromFunction(function () {
            if (1) {
                console.log("if");
            } else if (2)
                console.log("else");
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should handle if else correctly", function () {

        var code = codeFromFunction(function () {
            if (1) {
                console.log("if");
            } else if (2) {
                console.log("else");
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });

    it("should find missing curly braces for while", function () {

        var code = codeFromFunction(function () {
            while (1)
                console.log();
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should not detect correct while", function () {

        var code = codeFromFunction(function () {
            while (1) {
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });


    it("should find missing curly braces for ForIn", function () {

        var code = codeFromFunction(function () {
            for (var key in obj)
                console.log();
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should not detect correct forIn", function () {

        var code = codeFromFunction(function () {
            for (var key in obj) {
                console.log();
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });

    it("should find missing curly braces for for", function () {

        var code = codeFromFunction(function () {
            for (var i; i < 0;i++)
                console.log();
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should not detect correct for", function () {

        var code = codeFromFunction(function () {
            for (var i; i < 0; i++) {
            }
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });

    it("should find missing curly braces for do while", function () {

        var code = codeFromFunction(function () {
            do
                console.log();
            while (1);
        });

        expect(cop.analyse(code).hasVialotions()).to.be.true;

    });

    it("should not detect correct do while", function () {

        var code = codeFromFunction(function () {
            do {
            } while (1);
        });

        expect(cop.analyse(code).hasVialotions()).to.be.false;

    });


});