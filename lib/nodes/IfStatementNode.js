var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    ctor: function() {
        this.ifChildren = null;
        this.elseChildren = null;

        this.callBase();
    },

    _initialize: function (token) {

        this.ifChildren = this.initializeChildren([token.consequent]);

        var alternate = token.alternate;

        if (alternate) {
            this.elseChildren = this.initializeChildren([alternate]);
        }
    }

});