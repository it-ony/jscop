var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    ctor: function() {
        this.bodyNode = null;
        
        this.callBase();
    },
    
    _initialize: function (token) {
        this.bodyNode = this.initializeChildren([token.body]);
    }

});