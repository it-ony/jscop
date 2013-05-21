var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.DebuggerStatementCheck);

        this.subscribeTo(
            Grammar.DebuggerStatement
        )
    },

    checkNode: function (node) {

        this.createViolation("Avoid debugger statements.", node);

    }

});