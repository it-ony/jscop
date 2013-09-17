var AstNode = require("./AstNode.js");

module.exports = AstNode.inherit({

    usesVariable: function (identifier) {
        return identifier === this.token.name;
    }

});