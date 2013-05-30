var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.BlockStatement
        )
    },

    type: Index.Checks.EmptyBlockStatementCheck,

    checkNode: function (node) {
        if (node.children.length === 0) {
            this.createViolation("Avoid dynamic code evaluation.", node);
        }
    }

});