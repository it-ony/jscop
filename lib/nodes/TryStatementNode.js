var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    ctor: function() {
        this.block = null;
        this.handlers = null;
        this.finalizer = null;

        this.callBase();
    },

    _initialize: function (token) {

        this.block = this.initializeChildren([token.block]);
        this.handlers = this.initializeChildren(token.handlers);
        var finalizer = token.finalizer;

        if (finalizer) {
            this.finalizer = this.initializeChildren([ finalizer])
        }
    }

});