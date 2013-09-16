var AstNode = require("./AstNode.js"),
    Index = require("../../lib");

module.exports = AstNode.inherit({

    _initialize: function (declaration) {

        this.name = declaration.id.name;

        if (declaration.init) {
            this.value = this.initializeChildren([declaration.init])[0];
        }

    }
});