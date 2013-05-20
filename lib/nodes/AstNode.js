var inherit = require("inherit.js").inherit,
    Index = require("../../lib"),
    nodeTypes;

module.exports = inherit.Base.inherit({

    ctor: function (token, type) {
        this.token = token;
        this.type = type;
        this.parent = null;
        this.children = [];

    },

    initialize: function () {
        this._initialize(this.token);
    },

    _initialize: function (token) {
    },

    initializeChildren: function (body) {

        if (!(body instanceof Array)) {
            console.warn("body not an error");
        }

        for (var i = 0; i < body.length; i++) {
            var statement = body[i],
                type = statement.type,
                nodeType = this.getNodeTypeForType(type);

            if (nodeType) {

                var node = new nodeType(statement, type);
                node.initialize();

                this.addChild(node);
            } else {
                console.error("Node type " + type + " not found");
            }

        }
    },

    getNode: function () {
        return this;
    },

    getNodeTypeForType: function (type) {
        return nodeTypes[type];
    },

    addChild: function (node) {
        node.parent = this;
        this.children.push(node);
    },

    getChildren: function(types) {

        if (!types) {
            return this.children.slice();
        }

        var ret = [];

        for (var i = 0; i < this.children.length; i++) {
            if (types.indexOf(this.children[i].type) !== -1) {
                ret.push(this.children[i]);
            }
        }

        return ret;

    }

});

nodeTypes = {
    Program: require("./ProgramNode.js"),
    BlockStatement: require("./BlockStatementNode.js"),
    ExpressionStatement: require("./ExpressionStatementNode.js"),
    FunctionExpression: require("./FunctionExpressionNode.js"),
    CallExpression: require("./CallExpressionNode.js"),

    IfStatement: require("./IfStatementNode.js"),
    WhileStatement: require("./SimpleBodyNode.js"),
    ForInStatement: require("./SimpleBodyNode.js"),
    ForStatement: require("./SimpleBodyNode.js")
};
