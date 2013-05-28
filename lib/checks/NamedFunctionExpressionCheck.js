var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.NamedFunctionExpressionCheck);

        this.subscribeTo(
            Grammar.FunctionExpression
        )
    },

    checkNode: function (node) {

        if (node.token.id) {
            this.createViolation("Avoid named functions. Make the function anonymous.", node);
        }

    }

});