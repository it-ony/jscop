var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.BinaryExpression
        )
    },

    type: Index.Checks.StrictEqualCheck,

    checkNode: function (node) {

        var operator = node.token.operator;

        if (operator === "==" || operator === "!=") {
            this.createViolation("Avoid use of non strict equal checks.", node);
        }

    }

});