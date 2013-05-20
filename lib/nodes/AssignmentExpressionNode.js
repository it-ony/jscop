var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    _initialize: function (token) {
        this.initializeChildren([token.right]);
    }

});