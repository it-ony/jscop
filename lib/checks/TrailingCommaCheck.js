var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.ArrayExpression
        );
    },

    type: Index.Checks.TrailingCommaCheck,

    checkNode: function (node, codeAnalyse) {

        var token = node.token;

        if (token.elements.length > 0) {
            var code = codeAnalyse.code.substring(token.range[0], token.range[1]);
            if (/,\s*]$/.test(code)) {
                this.createViolation("Trailing comma in array.", node);
            }
        }
    }

});