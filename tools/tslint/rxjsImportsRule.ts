// tslint:disable
import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'invalid rxjs import';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'rxjs-imports',
    type: 'functionality',
    description: '',
    options: null,
    optionsDescription: 'Not configurable',
    typescriptOnly: true,
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
  }
}

class NoImportsWalker extends Lint.RuleWalker {
  public visitImportDeclaration(node: ts.ImportDeclaration): void {
    if (ts.isStringLiteral(node.moduleSpecifier) && node.importClause) {
      const specifier = node.moduleSpecifier;
      const path = (specifier as ts.StringLiteral).text;
      let found = false;
      if (ImportList.some(importItem => importItem === path)) {
        found = true;
      } else if (OperatorsPathRegEx.test(path)) {
        found = true;
      }

      if (found) {
        this.addFailure(this.createFailure(specifier.getStart() + 1, specifier.text.length, Rule.FAILURE_STRING));
      }
    }

    // call the base version of this visitor to actually parse this node
    super.visitImportDeclaration(node);
  }
}

const OperatorsPathRegEx = /^rxjs\/operators\/.*$/;

const ImportList = [
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
