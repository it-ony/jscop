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

        var ret = [];

        if (!(body instanceof Array)) {
            throw new Error("body not an Array");
        }

        for (var i = 0; i < body.length; i++) {
            var statement = body[i],
                type, nodeType;

            if (statement) {
                type = statement.type;
                nodeType = this.getNodeTypeForType(type);

                if (nodeType) {
                    var node = new nodeType(statement, type);
                    node.parent = this;
                    node.initialize();

                    this.addChild(node);
                    ret.push(node);
                } else {
                    throw new Error("Node type " + type + " not found");
                }
            }

        }

        return ret;
    },

    getNode: function () {
        return this;
    },

    /***
     *
     * @param {Array} types
     */
    findParent: function(types) {

        if (!types) {
            throw new Error("Type not specified");
        }

        if (!this.parent) {
            return null;
        }

        if (!(types instanceof Array)) {
            types = [types];
        }

        if (types.indexOf(this.parent.type) !== -1) {
            // parent not is from requested type
            return this.parent;
        }

        return this.parent.findParent(types);

    },

    /***
     *
     * @param type
     * @param fn
     * @returns {boolean} - true if stop
     */
    traverse: function(type, fn) {

        if (type === "depthFirst") {

            for (var i = 0; i < this.children.length; i++) {
                var childNode = this.children[i];

                if (fn(childNode) === true) {
                    // stop traversing
                    return true;
                }

                if (childNode.traverse(type, fn) === true) {
                    return true;
                }

            }

        } else {
            throw new Error("Traversing for type '" + type + "' not supported.");
        }

        // not stopping
        return false;
    },

    usesVariable: function(identified) {
        return false;
    },

    getNodeTypeForType: function (type) {
        return nodeTypes[type];
    },

    addChild: function (node) {
        node.parent = this;
        this.children.push(node);
    },

    getChildren: function (types) {

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
    FunctionDeclaration: require("./FunctionDeclarationNode.js"),
    CallExpression: require("./CallExpressionNode.js"),
    AssignmentExpression: require("./AssignmentExpressionNode.js"),
    ObjectExpression: require("./ObjectExpressionNode.js"),
    ConditionalExpression: require("./ConditionalExpressionNode.js"),
    ArrayExpression: require("./ArrayExpressionNode.js"),
    VariableDeclaration: require("./VariableDeclarationNode.js"),
    VariableDeclarator: require("./VariableDeclaratorNode.js"),
    BinaryExpression: require("./BinaryExpressionNode.js"),
    NewExpression: require("./NewExpressionNode.js"),
    IfStatement: require("./IfStatementNode.js"),
    WhileStatement: require("./WhileStatementNode.js"),
    ForInStatement: require("./SimpleBodyNode.js"),
    ForStatement: require("./SimpleBodyNode.js"),
    DoWhileStatement: require("./DoWhileStatementNode.js"),
    EmptyStatement: require("./AstNode.js"),
    DebuggerStatement: require("./AstNode.js"),
    WithStatement: require("./SimpleBodyNode.js"),
    MemberExpression: require("./MemberExpressionNode.js"),
    ReturnStatement: require("./ReturnExpressionNode.js"),
    LogicalExpression: require("./LogicalExpressionNode.js"),
    UpdateExpression: require("./UpdateExpressionNode.js"),

    Literal: require("./AstNode.js"),
    Identifier: require("./IdentifierNode.js"),
    ThisExpression: require("./AstNode.js"),
    ContinueStatement: require("./AstNode.js")
};
