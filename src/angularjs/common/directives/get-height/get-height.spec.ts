import * as angular from 'angular';
import { IRootScopeService } from '../../services/root-scope/root-scope.service';
import getHeight from './get-height';

describe('Unit testing: profitelo.directives.getHeight', () =>
  describe('for getHeight directive >', () => {

    let compile: ng.ICompileService;
    let scope: ng.IScope;
    const validHTML = '<get-height></get-height>';

    beforeEach(() => {
      angular.mock.module(getHeight);

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    function create() {
      const elem = angular.element(validHTML);
      const compiledElement = compile(elem)(scope);
      scope.$digest();
      return compiledElement;
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy();
    }));

    it('should compile the directive', () => {
      const el = create();
      expect(el.html()).toBeDefined(true);
    });

  }));
