var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    _initialize: function () {
        // nothing to do here
        this.initializeChildren([this.token.expression]);
    }
});