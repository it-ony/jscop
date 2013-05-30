var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.ObjectExpression
        );
    },

    type: Index.Checks.DuplicatePropertyNameCheck,

    checkNode: function (node) {

        var names = [];

        for (var i = 0; i < node.token.properties.length; i++) {
            var property = node.token.properties[i],
                name;

            if (property.key.type === Index.Grammar.Identifier) {
                name = property.key.name;
            } else {
                name = property.key.value;
            }

            if (names.indexOf(name) !== -1) {
                this.createViolation("Duplicate declaration.", node);
            }

            names.push(name);
        }

    }

});