var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.AssignmentExpression
        );
    },

    type: Index.Checks.ItselfAssignmentCheck,

    checkNode: function (node) {

        if (node.token.right.type === Grammar.Identifier &&
            node.token.left.name === node.token.right.name) {
            this.createViolation("Avoid debugger statements.", node);
        }

    }

});