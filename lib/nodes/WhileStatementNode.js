var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    ctor: function() {
        this.test = null;
        this.body = null;

        this.callBase();
    },

    _initialize: function (token) {

        this.testChildren = this.initializeChildren([token.test]);
        this.body = this.initializeChildren([token.body]);

    }

});