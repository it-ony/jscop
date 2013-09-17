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
            var scope = variableNode.findParent([Grammar.BlockStatement]),
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

        } else {
            throw new Error("How is it possible, that the code reaches this point?");
        }


    }

});