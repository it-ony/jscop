var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({


    _initialize: function (token) {
        this.name = token.name;
    },

    usesVariable: function (identifier) {
        return identifier === this.token.name;
    }

});