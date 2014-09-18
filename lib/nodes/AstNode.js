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
    Program: require("./ProgramNode"),
    BlockStatement: require("./BlockStatementNode"),
    ExpressionStatement: require("./ExpressionStatementNode"),
    FunctionExpression: require("./FunctionExpressionNode"),
    FunctionDeclaration: require("./FunctionDeclarationNode"),
    CallExpression: require("./CallExpressionNode"),
    AssignmentExpression: require("./AssignmentExpressionNode"),
    ObjectExpression: require("./ObjectExpressionNode"),
    ConditionalExpression: require("./ConditionalExpressionNode"),
    ArrayExpression: require("./ArrayExpressionNode"),
    VariableDeclaration: require("./VariableDeclarationNode"),
    VariableDeclarator: require("./VariableDeclaratorNode"),
    BinaryExpression: require("./BinaryExpressionNode"),
    NewExpression: require("./NewExpressionNode"),
    IfStatement: require("./IfStatementNode"),
    WhileStatement: require("./SimpleBodyNode"),
    ForInStatement: require("./SimpleBodyNode"),
    ForStatement: require("./SimpleBodyNode"),
    DoWhileStatement: require("./SimpleBodyNode"),
    EmptyStatement: require("./AstNode"),
    DebuggerStatement: require("./AstNode"),
    WithStatement: require("./SimpleBodyNode"),
    MemberExpression: require("./MemberExpressionNode"),
    ReturnStatement: require("./ReturnExpressionNode"),
    LogicalExpression: require("./LogicalExpressionNode"),
    UpdateExpression: require("./UpdateExpressionNode"),

    UnaryExpression: require("./AstNode"),
    TryStatement: require("./TryStatementNode"),
    CatchClause: require("./CatchClause"),

    Literal: require("./AstNode"),
    Identifier: require("./IdentifierNode"),
    ThisExpression: require("./AstNode"),
    ContinueStatement: require("./AstNode")
};
