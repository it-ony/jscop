var expect = require('chai').expect;

describe("Module", function () {

    var JsCop = require("..");

    it("export classes", function () {
        expect(JsCop).to.exist;
    });

    describe("Module", function () {

        it("codeFromFunction", function () {

            var code = JsCop.Helper.codeFromFunction(function () {});
            expect(code).to.eql("(function () {})");

        });

    });

});