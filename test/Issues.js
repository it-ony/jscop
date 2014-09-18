var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("Issues", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("should parse code containing unary expressions", function() {

        var code = JsCop.Helper.codeFromFunction(function() {
            y = +1;
        });

        cop.analyse(code);
    });


});