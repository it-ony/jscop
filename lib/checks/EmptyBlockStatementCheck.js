var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.BlockStatement
        );
    },

    type: Index.Checks.EmptyBlockStatementCheck,

    checkNode: function (node) {

        if (node.parent && (node.parent.type === Grammar.FunctionDeclaration ||
            node.parent.type === Grammar.FunctionExpression)) {

            // empty blocks for function statements allowed

            return;
        }

        if (node.children.length === 0) {
            this.createViolation("Empty block.", node);
        }
    }

});