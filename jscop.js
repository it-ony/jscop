var inherit = require("inherit.js"),
    Index = require("./lib"),
    CodeAnalyse = require("./lib/CodeAnalyse.js");

var JsCop = function (options) {

    options = options || {};

    if (!options.checks) {
        options.checks = [];

        var checks = Index.Checks;

        for (var key in checks) {
            if (checks.hasOwnProperty(key)) {
                options.checks.push(__dirname + "/lib/checks/" + checks[key]);
            }
        }

    }

    this.options = options;
    this.checks = [];

    this.initializeChecks();
};

JsCop.prototype = {

    initializeChecks: function () {

        var checks = this.options.checks;
        for (var i = 0; i < checks.length; i++) {
            this.addCheck(require(checks[i]));
        }
    },

    /***
     * adds a check to the list of executed checks
     * @param check
     */
    addCheck: function (check) {
        this.checks.push(check);
    },

    analyse: function (code) {
        return new CodeAnalyse(code, this.options, this).performChecks();
    }

};


JsCop.Helper = {
    codeFromFunction: function (fn) {
        return "(" + fn.toString() + ");";
    }
};


JsCop.emptyCallback = function () {
};

JsCop.Index = Index;


module.exports = JsCop;
