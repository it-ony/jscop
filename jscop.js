var inherit = require("inherit.js"),
    Index = require("./lib"),
    CodeAnalyse = require("./lib/CodeAnalyse.js");

var JsCop = function (options) {

    var availableChecks = Index.availableChecks;

    options = options || {};

    if (!options.checks) {
        options.checks = [];
        for (var i = 0; i < availableChecks.length; i++) {
            options.checks.push(__dirname + "/lib/checks/" + availableChecks[i]);
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

    analyse: function (code, options) {
        return new CodeAnalyse(code, options, this).performChecks();
    }

};


JsCop.Helper = {
    codeFromFunction: function (fn) {
        return "(" + fn.toString() + ")";
    }
};


JsCop.emptyCallback = function () {
};


module.exports = JsCop;
