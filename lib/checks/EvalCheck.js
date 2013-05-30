var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.CallExpression
        );
    },

    type: Index.Checks.EvalCheck,

    checkNode: function (node) {

        if (node.token.callee.name === "eval") {
            this.createViolation("Avoid dynamic code evaluation.", node);
        }
    }

});