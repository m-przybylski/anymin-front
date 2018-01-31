import * as angular from 'angular';

function normalizeTranslationKeyFilter(): (input: string) => string {
  return function (input: string): string {
    return String(input).toUpperCase().split('-').join('_');
  };
}

angular.module('profitelo.filters.normalize-translation-key-filter', [])
  .filter('normalizeTranslationKey', [normalizeTranslationKeyFilter]);
