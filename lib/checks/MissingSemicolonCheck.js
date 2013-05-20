var Check = require("./Check.js"),
    Grammar = require("../../lib").Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.CallExpression
        )
    },

    checkNode: function (node, codeAnalyse) {

        var endPosition = node.token.range[1];
        if (codeAnalyse.code.substr(endPosition, 1) !== ";") {
            this.createVialotion("Missing semicolon.", node);
        }

    }

});