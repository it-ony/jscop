var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    options: {
        /***
         * a list of allowed global identifies
         * @type Array
         */
        excluded: []
    },

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.Identifier
        );
    },

    type: Index.Checks.GlobalLeakCheck,

    checkNode: function (node) {

        var parentNode = node.parent;

        if (parentNode.type === Index.Grammar.VariableDeclarator) {
            // a variable declaration cannot leak to global
            return;
        }

        if ((parentNode.type === Index.Grammar.FunctionDeclaration ||
            parentNode.type === Index.Grammar.FunctionExpression) && parentNode.hasParameter(node.name)) {
            // identifier as part of the parameter list of a function cannot leak
            return;
        }

        if (parentNode.type === Index.Grammar.FunctionDeclaration && parentNode.token.id.name === node.name) {
            // name of the function
            return;
        }


        // get the block scope
        var lastScope = null,
            scope,
            evaluatedScopes = [],
            scopeTypes = [Index.Grammar.BlockStatement, Index.Grammar.Program],
            declarationFound = false;

        // find the next scope
        // -> check if either a VariableDeclarator or a FunctionDeclaration is found

        do {

            if (lastScope) {
                // search scope form last scope
                scope = lastScope.findParent(scopeTypes);
            } else {
                scope = node.findParent(scopeTypes);
            }


            (function (scope, lastScope) {
                scope.traverse("depthFirst", function (n) {
                    if (n === lastScope) {
                        // stop searching
                        return true;
                    }

                    if (n.type === Index.Grammar.VariableDeclarator && n.name === node.name) {
                        declarationFound = true;
                        return true;
                    }

                    if ((n.type === Index.Grammar.FunctionDeclaration ||
                        n.type === Index.Grammar.FunctionExpression) && n.hasParameter(node.name)) {
                        declarationFound = true;
                        return true;
                    }

                    if (n.type === Index.Grammar.FunctionDeclaration && n.token.id.name === node.name) {
                        declarationFound = true;
                        return true;
                    }

                    return false;
                });

            })(scope, lastScope);

            if (declarationFound) {
                // nothing to do anymore
                return;
            }

            lastScope = scope;

        } while (scope.type !== Index.Grammar.Program);

        this.createViolation("Global leak or global access found for variable '" + node.name + "'.", node);
    }

});