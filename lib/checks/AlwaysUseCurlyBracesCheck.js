var Check = require("./Check.js"),
    Grammar = require("../../lib").Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.IfStatement,
            Grammar.ForInStatement,
            Grammar.ForStatement,
            Grammar.WhileStatement,
            Grammar.DoWhileStatement,
            Grammar.ElseClause
        )
    },

    checkNode: function (node) {

        for (var i = 0; i < node.children.length; i++) {
            if (node.children[i].type !== Grammar.BlockStatement) {
                this.createVialotion("Missing curly brace.", node);
            }
        }

    }

});