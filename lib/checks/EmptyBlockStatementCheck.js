var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.EmptyBlockStatementCheck);

        this.subscribeTo(
            Grammar.BlockStatement
        )
    },

    checkNode: function (node) {
        if (node.children.length === 0) {
            this.createViolation("Avoid dynamic code evaluation.", node);
        }
    }

});