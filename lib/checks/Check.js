var inherit = require("inherit.js").inherit;

module.exports = inherit.Base.inherit({

    ctor: function (type) {
        this.type = type;

        this.subscriptions = [];
        this.vialotions = [];
    },

    subscribeTo: function () {
        var types = Array.prototype.slice.call(arguments);

        for (var i = 0; i < types.length; i++) {
            this.subscriptions.push(types[i]);
        }
    },

    visitNode: function (node, codeAnalyse) {
        if (this.subscriptions.indexOf(node.type) !== -1) {
            this.checkNode(node, codeAnalyse);
        }
    },

    checkNode: function (node, codeAnalyse) {
    },

    createViolation: function (message, node) {
        this.vialotions.push({
            message: message,
            node: node
        });
    },

    hasViolations: function() {
        return this.vialotions.length > 0;
    }

});

