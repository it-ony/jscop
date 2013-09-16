var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    _initialize: function () {
        this.expression = this.initializeChildren([this.token.expression])[0];
    }
});