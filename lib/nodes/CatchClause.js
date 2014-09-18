var SimpleBodyNode = require("./SimpleBodyNode.js");

module.exports = SimpleBodyNode.inherit({

    ctor: function() {
        this.param = null;
        this.callBase();
    },
    
    _initialize: function (token) {
        this.param = this.initializeChildren([token.param]);
        this.callBase();
    }

});