var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    ctor: function() {
        this.arguments = null;
        this.callBase();
    },

    _initialize: function (token) {
        this.arguments = [];

        for (var i = 0; i < token.arguments.length; i++) {
            this.arguments.push(this.initializeChildren([token.arguments[i]])[0]);
        }

        this.callee = this.initializeChildren([token.callee]);

    }

});