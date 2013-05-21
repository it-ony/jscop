var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.WithStatementCheck);

        this.subscribeTo(
            Grammar.WithStatement
        )
    },

    checkNode: function (node) {
        this.createViolation("Avoid with statements.", node);
    }

});