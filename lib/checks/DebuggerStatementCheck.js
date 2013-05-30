var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.DebuggerStatement
        );
    },

    type: Index.Checks.DebuggerStatementCheck,

    checkNode: function (node) {

        this.createViolation("Avoid debugger statements.", node);

    }

});