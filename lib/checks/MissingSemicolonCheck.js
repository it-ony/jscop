var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.MissingSemicolonCheck);

        this.subscribeTo(
            Grammar.CallExpression,
            Grammar.AssignmentExpression
        )
    },

    checkNode: function (node, codeAnalyse) {

        var endPosition = node.token.range[1];
        if (codeAnalyse.code.substr(endPosition, 1) !== ";") {
            this.createViolation("Missing semicolon.", node);
        }

    }

});