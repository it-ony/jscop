var expect = require('chai').expect,
    JsCop = require(".."),
    Index = require("../lib"),
    CodeAnalyse = require("../lib/CodeAnalyse.js"),
    codeFromFunction = JsCop.Helper.codeFromFunction;

describe("AstNodeTest.js", function () {

    var cop;

    before(function () {
        cop = new JsCop();
    });

    it("check that findParent works", function () {

        var code = codeFromFunction(function () {
            foo(function () {
                var x;
            });
        });

        var analysis = new CodeAnalyse(code);

        var program = analysis.rootNode,
            declarator = program.children[0].children[0].bodyNode[0].children[0].children[0].arguments[0].bodyNode[0].children[0].children[0],
            find;

        expect(program.type).to.eql(Index.Grammar.Program);
        expect(declarator.type).to.eql(Index.Grammar.VariableDeclarator);

        find = declarator.findParent(Index.Grammar.Program);

        expect(program).to.equal(find);

        find = declarator.findParent(Index.Grammar.BlockStatement);
        expect(find).to.equal(program.children[0].children[0].bodyNode[0].children[0].children[0].arguments[0].bodyNode[0]);


    });

});