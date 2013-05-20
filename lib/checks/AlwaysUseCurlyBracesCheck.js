var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.AlwaysUseCurlyBracesCheck);

        this.subscribeTo(
            Grammar.IfStatement,
            Grammar.ForInStatement,
            Grammar.ForStatement,
            Grammar.WhileStatement,
            Grammar.DoWhileStatement
        )
    },

    checkNode: function (node) {

        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];

            if (node.type === Grammar.IfStatement && child.type === Grammar.IfStatement &&
                node.elseChildren && node.elseChildren.indexOf(child) !== -1) {
                // else if block
                continue;
            }

            if (child.type !== Grammar.BlockStatement) {
                this.createVialotion("Missing curly brace.", node);
            }
        }

    }

});