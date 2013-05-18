var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    _initialize: function (token) {

        this.initializeChildren([token.consequent]);

        var alternate = token.alternate;

        if (alternate) {
            this.initializeChildren([alternate]);
        }
    }

});