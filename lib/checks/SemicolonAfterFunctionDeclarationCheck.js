var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.FunctionDeclaration
        );
    },

    type: Index.Checks.SemicolonAfterFunctionDeclarationCheck,

    checkNode: function (node, codeAnalyse) {

        if (/^\s*;/.test(codeAnalyse.code.substr(node.token.range[1]))) {
            this.createViolation("Semicolon after function declaration.", node);
        }
    }

});