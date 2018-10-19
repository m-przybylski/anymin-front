"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'invalid rxjs import';
    Rule.metadata = {
        ruleName: 'rxjs-imports',
        type: 'functionality',
        description: '',
        options: null,
        optionsDescription: 'Not configurable',
        typescriptOnly: true
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoImportsWalker = (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        if (ts.isStringLiteral(node.moduleSpecifier) && node.importClause) {
            var specifier = node.moduleSpecifier;
            var path_1 = specifier.text;
            var found = false;
            if (ImportList.some(function (importItem) { return importItem === path_1; })) {
                found = true;
            }
            else if (OperatorsPathRegEx.test(path_1)) {
                found = true;
            }
            if (found) {
                this.addFailure(this.createFailure(specifier.getStart() + 1, specifier.text.length, Rule.FAILURE_STRING));
            }
        }
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
var OperatorsPathRegEx = /^rxjs\/operators\/.*$/;
var ImportList = [
    'rxjs/util/',
    'rxjs/util/pipe',
    'rxjs/util/noop',
    'rxjs/util/identity',
    'rxjs/util/ArgumentOutOfRangeError',
    'rxjs/util/EmptyError',
    'rxjs/util/ObjectUnsubscribedError',
    'rxjs/util/UnsubscriptionError',
    'rxjs/util/TimeoutError',
    'rxjs/testing/',
    'rxjs/scheduler/',
    'rxjs/interfaces',
    'rxjs/AsyncSubject',
    'rxjs/BehaviorSubject',
    'rxjs/Notification',
    'rxjs/Observable',
    'rxjs/Observer',
    'rxjs/Operator',
    'rxjs/ReplaySubject',
    'rxjs/Rx',
    'rxjs/Subject',
    'rxjs/Subscriber',
    'rxjs/Scheduler',
    'rxjs/Subscription',
    'rxjs/observable/bindCallback',
    'rxjs/observable/combineLatest',
    'rxjs/observable/concat',
    'rxjs/observable/ConnectableObservable',
    'rxjs/observable/defer',
    'rxjs/observable/forkJoin',
    'rxjs/observable/from',
    'rxjs/observable/fromEvent',
    'rxjs/observable/fromEventPattern',
    'rxjs/observable/interval',
    'rxjs/observable/merge',
    'rxjs/observable/of',
    'rxjs/observable/race',
    'rxjs/observable/range',
    'rxjs/observable/timer',
    'rxjs/observable/zip',
    'rxjs/observable/fromPromise',
    'rxjs/observable/if',
    'rxjs/observable/throw',
    'rxjs/observable/never',
    'rxjs/observable/empty',
    'rxjs/observable/FromEventObservable',
];
