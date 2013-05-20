var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.EmptyStatementCheck);

        this.subscribeTo(
            Grammar.EmptyStatement
        )
    },

    checkNode: function (node) {
        this.createVialotion("Empty statement.", node);
    }

});