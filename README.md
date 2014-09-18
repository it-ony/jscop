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
* expressive parameter use
* unused variables
* global leaks
* missing semicolon
* detect named function expressions
* strict equality check
* trailing array comma
* unused parameter check
* with statement check
* variable name check
* identifier reserved words "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"
* ; after function declarations
* x=x assignments

## Contribution

* Pick one of the missing checks below, or send in a new check
* Write at least one positive and one false positive test
* Run the tests

```
npm install && npm test
```

## TODO:

* boolean trap http://ariya.ofilabs.com/2011/08/hall-of-api-shame-boolean-trap.html
* check documentation
* var x = 1; return x;
*combine var statements
*pretty print javascript

* check access globals
* global var check

* function declaration inside loops
* for in -> hasOwnProperty
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
* inconsistent return points
* duplicate declaration: var twice, var with same name as function, var with same name as parameter, function with same name as parameter
* if (true), if (1 == 1), if (!true), if (0), if (number) -> if statement with literal

* check function names

## Code style

* spaces/tabs
* amout of spaces

