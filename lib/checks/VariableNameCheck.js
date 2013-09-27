var Check = require("./Check.js"),
    Index = require("../../lib"),
    Grammar = Index.Grammar;

module.exports = Check.inherit({

    options: {
        /***
         * regular expression to check the name of variables
         * @type RegExp
         */
        name: /^[a-z$_][a-zA-Z0-9]{0,19}$/,

        /***
         * regular expression to check the name of variables
         * @type RegExp
         */
        functionName: /^[a-zA-Z]{1,20}$/
    },

    ctor: function () {
        this.callBase();

        this.subscribeTo(
            Grammar.VariableDeclarator
        );
    },

    type: Index.Checks.VariableNameCheck,

    checkNode: function (node) {

        if (!this.options.name.test(node.name)) {
            // variable not matching the general name

            // check if it is initialized with a FunctionExpression
            if (node.value && node.value.type === Index.Grammar.FunctionExpression) {

                if (!this.options.functionName.test(node.name)) {
                    this.createViolation("Variable name '" + node.name + "' doesn't match " + this.options.name.toString(), node);
                }


            } else {
                this.createViolation("Variable name '" + node.name + "' doesn't match " + this.options.name.toString(), node);
            }



        }

    }

});