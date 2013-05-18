var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    _initialize: function () {
        // nothing to do here
    },

    getNode: function () {

        var type = this.token.expression.type;
        var nodeType = this.getNodeTypeForType(type);

        if (!nodeType) {
            console.error("Node type " + type + " not found");
        }

        var node = new nodeType(this.token.expression.body, type);
        return node.getNode();
    }
});