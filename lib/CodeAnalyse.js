var inherit = require("inherit.js").inherit,
    esprima = require("esprima"),
    ProgramNode = require("./nodes/ProgramNode.js");

module.exports = inherit.Base.inherit({

    ctor: function (code, options, jscop) {
        this.jscop = jscop;
        this.options = options;
        this.code = code;

        this.ast = esprima.parse(code, {
            range: true
        });

        this.rootNode = new ProgramNode(this.ast);
        this.rootNode.initialize();
    },

    performChecks: function () {

        var checks = [];

        for (var i = 0; i < this.jscop.checks.length; i++) {
            var check = new this.jscop.checks[i];

            this.performCheck(check, this.rootNode);
            checks.push(check);
        }

        this.checks = checks;

        return this;

    },

    hasVialotions: function() {

        for (var i = 0; i < this.checks.length; i++) {
            var check = this.checks[i];
            if (check.vialotions.length > 0) {
                return true;
            }
        }

        return false;

    },


    performCheck: function (check, node) {

        check.visitNode(node);

        for (var i = 0; i < node.children.length; i++) {
            this.performCheck(check, node.children[i]);
        }
    }
});