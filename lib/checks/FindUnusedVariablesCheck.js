var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.VariableDeclarator
        );
    },

    type: Index.Checks.FindUnusedVariablesCheck,

    checkNode: function (variableNode) {

        if (variableNode.type === Grammar.VariableDeclarator) {
            // find the block scope
            var scope = variableNode.findParent([Grammar.BlockStatement, Grammar.Program]),
                foundUsage = false;

            scope.traverse("depthFirst", function(node) {

                if (node.usesVariable(variableNode.name)) {
                    foundUsage = true;

                    // stop searching
                    return true;
                }

                // continue searching
                return false;
            });

            if (!foundUsage) {
                this.createViolation("Unused variable '" + variableNode.name + "' found.", variableNode);
            }

        }

    }

});