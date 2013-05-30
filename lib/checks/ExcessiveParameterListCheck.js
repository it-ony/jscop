var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    options: {
        /***
         * the maximum number of parameters
         * @type Number
         */
        maxFunctionParameters: 7,

        /***
         * an array of function names that are excluded from the check
         * @type Array
         */
        excludeFunctions: []
    },

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.CallExpression
        );
    },

    type: Index.Checks.ExcessiveParameterListCheck,

    checkNode: function (node) {

        var numberOfParameters = this.options.maxFunctionParameters,
            excludedFunctions = this.options.excludeFunctions || [];

        if (excludedFunctions.indexOf(node.token.callee.name) === -1 &&
            node.token.arguments.length > numberOfParameters) {
            this.createViolation("Avoid function calls with more than " + numberOfParameters + " parameters.", node);
        }

    }

});