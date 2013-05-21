var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.StrictEqualCheck);

        this.subscribeTo(
            Grammar.BinaryExpression
        )
    },

    checkNode: function (node) {

        var operator = node.token.operator;

        if (operator === "==" || operator === "!=") {
            this.createViolation("Avoid use of non strict equal checks.", node);
        }

    }

});