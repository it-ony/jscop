var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    ctor: function (ast) {
        this.ast = ast;
        this.callBase();

    },

    _initialize: function (token) {
        this.initializeChildren(token.body);
    }
});