var AstNode = require("./AstNode.js"),
    Index = require("../../lib");

module.exports = AstNode.inherit({

    ctor: function() {
        this.properties = {};
        this.callBase();
    },

    _initialize: function (token) {

        for (var i = 0; i < token.properties.length; i++) {
            var property = token.properties[i],
                name;

            if (property.key.type === Index.Grammar.Identifier) {
                name = property.key.name;
            } else {
                name = property.key.value;
            }

            this.properties[name] = {
                property: property,
                node: this.initializeChildren([property.value])[0]
            }

        }
    }
});