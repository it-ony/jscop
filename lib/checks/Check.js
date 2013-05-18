var inherit = require("inherit.js").inherit;

module.exports = inherit.Base.inherit({

    ctor: function () {
        this.subscriptions = [];
        this.vialotions = [];
    },

    subscribeTo: function() {
        var types = Array.prototype.slice.call(arguments);

        for (var i = 0; i < types.length; i++) {
            this.subscriptions.push(types[i]);
        }
    },

    visitNode: function (node) {
        if (this.subscriptions.indexOf(node.type) !== -1) {
            this.checkNode(node);
        }
    },

    checkNode: function(node) {
    },

    createVialotion: function(message, node) {
        this.vialotions.push({
            message: message,
            node: node
        });
    }

});

