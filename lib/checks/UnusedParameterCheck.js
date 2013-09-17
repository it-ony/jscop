var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.FunctionDeclaration,
            Grammar.FunctionExpression
        );
    },

    type: Index.Checks.UnusedParameterCheck,

    checkNode: function (functionNode) {

        // go backwards through the parameter list, because some function that overwrite
        // other function may have a signature where the first parameters are unused, but
        // this is not an warning if a following parameter is used

        for (var i = functionNode.params.length - 1; i >= 0; i--) {

            var foundUsage = false;

            (function(parameterName) {

                functionNode.traverse("depthFirst", function (node) {

                    var isParameter = (node.type === Index.Grammar.Identifier && node.parent === functionNode);

                    if (!isParameter && node.usesVariable(parameterName)) {
                        foundUsage = true;

                        // stop searching
                        return true;
                    }

                    // continue searching
                    return false;
                });

            })(functionNode.params[i].token.name);

            if (!foundUsage) {
                this.createViolation("Unused parameter '" + functionNode.name + "' found.", functionNode);
            } else {
                // found usage of a parameter, every previous parameter don't need to be checked
                break;
            }

        }


    }

});