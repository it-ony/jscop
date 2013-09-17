var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    ctor: function() {
        this.bodyNode = null;
        this.params = null;
        
        this.callBase();
    },
    
    _initialize: function (token) {
        this.params = this.initializeChildren(token.params);
        this.bodyNode = this.initializeChildren([token.body]);
    }

});