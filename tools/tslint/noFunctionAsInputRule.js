"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// tslint:disable
var ts = require("typescript");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.FAILURE_STRING = 'functions are not allowed to be input use output';
    Rule.metadata = {
        ruleName: 'no-function-as-input',
        type: 'functionality',
        description: '',
        options: null,
        optionsDescription: 'Not configurable',
        typescriptOnly: true
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var cb = function (node) {
        ts.forEachChild(node, cb);
        if (isPropertyDeclaration(node) && isFunctionType(node) && hasInputDecorator(node)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
    };
    ts.forEachChild(ctx.sourceFile, cb);
}
function isPropertyDeclaration(node) {
    return node.kind === ts.SyntaxKind.PropertyDeclaration;
}
function isFunctionType(node) {
    return node.type !== undefined && node.type.kind === ts.SyntaxKind.FunctionType;
}
function isSyntaxList(node) {
    return node.kind === ts.SyntaxKind.SyntaxList;
}
function isInputDecorator(node) {
    return node.kind === ts.SyntaxKind.Decorator && node.getText().toLowerCase().indexOf('input') !== -1;
}
function hasInputDecorator(node) {
    for (var _i = 0, _a = node.getChildren(); _i < _a.length; _i++) {
        var child = _a[_i];
        if (isSyntaxList(child)) {
            for (var _b = 0, _c = child.getChildren(); _b < _c.length; _b++) {
                var syntaxList = _c[_b];
                if (isInputDecorator(syntaxList)) {
                    return true;
                }
            }
        }
    }
    return false;
}
