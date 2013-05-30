var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.EmptyStatement
        )
    },

    type: Index.Checks.EmptyStatementCheck,

    checkNode: function (node) {
        this.createViolation("Empty statement.", node);
    }

});