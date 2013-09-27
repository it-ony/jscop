var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    options: {
        /***
         * a list of reserved identifier names
         * @type Array
         */
        reservedKeywords: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"]
    },

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.VariableDeclarator,
            Grammar.FunctionDeclaration
        );
    },

    type: Index.Checks.ReservedKeywordIdentifierCheck,

    checkNode: function (node) {

        if (node.type === Grammar.VariableDeclarator) {
            if (this.options.reservedKeywords.indexOf(node.name) !== -1) {
                this.createViolation("Found reserved keyword as variable identifier '" + node.name + "'.", node);
            }
        } else if (node.type === Grammar.FunctionDeclaration) {
            if (this.options.reservedKeywords.indexOf(node.token.id.name) !== -1) {
                this.createViolation("Found reserved keyword as function name '" + node.name + "'.", node);
            }
        }

        if (node.type === Grammar.FunctionDeclaration || node.type === Grammar.FunctionExpression) {
            for (var i = 0; i < node.params.length; i++) {
                if (this.options.reservedKeywords.indexOf(node.params[i].name) !== -1) {
                    this.createViolation("Found reserved keyword as function parameter'" + node.name + "'.", node);
                }
            }
        }

    }

});