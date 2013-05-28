var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    ctor: function () {
        this.callBase(Index.Checks.ExcessiveParameterListCheck);

        this.subscribeTo(
            Grammar.CallExpression
        )
    },

    checkNode: function (node) {

        // TODO: configure number of parameters (per function name -> -1: exclude from validation)
        var numberOfParameters = 7;

        if (node.token.arguments.length > numberOfParameters) {
            this.createViolation("Avoid function calls with more than " + numberOfParameters + " parameters.", node);
        }

    }

});