var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.ExpressionStatement,
            Grammar.VariableDeclaration
        );
    },

    type: Index.Checks.MissingSemicolonCheck,

    checkNode: function (node, codeAnalyse) {

        var endPosition = node.token.range[1];
        if (codeAnalyse.code.substr(endPosition - 1, 1) !== ";") {
            this.createViolation("Missing semicolon.", node);
        }

    }

});