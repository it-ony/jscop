var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.WithStatement
        )
    },

    type: Index.Checks.WithStatementCheck,

    checkNode: function (node) {
        this.createViolation("Avoid with statements.", node);
    }

});