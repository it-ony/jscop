var AstNode = require("./AstNode.js"),
    Index = require("../../lib");

module.exports = AstNode.inherit({

    ctor: function () {
        this.declarations = {};
        this.callBase();
    },

    _initialize: function (token) {

        for (var i = 0; i < token.declarations.length; i++) {
            var declaration = token.declarations[i],
                name = declaration.id.name;

            var node;
            if (declaration.init) {
                node = this.initializeChildren([declaration.init])[0];
            }

            this.declarations[name] = {
                declaration: declaration,
                node: node
            }

        }
    }
});