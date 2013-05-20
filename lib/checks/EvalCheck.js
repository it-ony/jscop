var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.EvalCheck);

        this.subscribeTo(
            Grammar.CallExpression
        )
    },

    checkNode: function (node) {

        if (node.token.callee.name === "eval") {
            this.createVialotion("Avoid dynamic code evaluation.", node);
        }
    }

});