var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.FunctionExpression
        );
    },

    type: Index.Checks.NamedFunctionExpressionCheck,

    checkNode: function (node) {

        if (node.token.id) {
            this.createViolation("Avoid named functions. Make the function anonymous.", node);
        }

    }

});