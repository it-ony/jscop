var AstNode = require("./AstNode.js"),
    Index = require("../../lib");

module.exports = AstNode.inherit({

    _initialize: function (token) {
        this.initializeChildren([token.argument]);
    }
});