var AstNode = require("./AstNode.js"),
    Index = require("../../lib");

module.exports = AstNode.inherit({

    ctor: function() {
        this.elements = [];
        this.callBase();
    },

    _initialize: function (token) {

        for (var i = 0; i < token.elements.length; i++) {
            var element = token.elements[i];

            this.elements.push({
                property: element,
                node: element ? this.initializeChildren([element])[0] : null
            });

        }
    }
});