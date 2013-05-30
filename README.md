[![build status](https://secure.travis-ci.org/it-ony/jscop.png)](http://travis-ci.org/it-ony/jscop)
[![NPM version](https://badge.fury.io/js/jscop.png)](http://badge.fury.io/js/jscop)

# jscop
## Introduction

jscop is a static code analyser written in node js.

## Checks

* missing curling braces
* debugger statement
* duplicate property name
* empty block statements
* empty statements
* eval
* missing semicolon
* strict equality check
* trailing array comma
* with statement check
* named function expression
* too many parameters

## TODO:

* boolean trap http://ariya.ofilabs.com/2011/08/hall-of-api-shame-boolean-trap.html
* check documentation
* x=x assignments
* var x = 1; return x;
*combine var statements
*pretty print javascript


* function declaration inside loops
* unused variables
* for in -> hasOwnProperty
* identifier reserved words "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"
* global var check
* ; after function declarations
* deep of nested ifs
* inconsistent return points
* case without break check
* one statement per line
* redeclared function
* redeclared variable
* single qoutes
* unreachable code check
* unused function arguments check
* variable declaration after usage
* check access globals
