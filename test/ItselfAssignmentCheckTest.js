var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("ItselfAssignmentCheck", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should not validate with assignment to itself", function () {

        var code = codeFromFunction(function () {
            var a;
            a = a;
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ItselfAssignmentCheck)).to.be.true;

    });

    it("should validate without assignment to itself", function () {

        var code = codeFromFunction(function () {
            var a, b;
            a = b;
        });

        expect(cop.analyse(code).hasViolation(Index.Checks.ItselfAssignmentCheck)).to.be.false;

    });


});