var inherit = require("inherit.js").inherit;

module.exports = inherit.Base.inherit({

    options: {
    },

    ctor: function (options) {

        options = options || {};

        var type = this.type || "",
            lowerCaseType = type.charAt(0).toLowerCase() + type.substr(1),
            defaultOptions = this.options;

        options = options[type] || options[lowerCaseType] || {};

        if (defaultOptions) {
            for (var key in defaultOptions) {
                if (defaultOptions.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
                    options[key] = defaultOptions[key];
                }
            }
        }

        this.options = options;

        this.subscriptions = [];
        this.vialotions = [];
    },

    type: null,

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

