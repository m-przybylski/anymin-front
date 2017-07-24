import {INavbarHelpComponentBindings} from './navbar-help'
import * as angular from 'angular'

export class NavbarHelpComponentController implements INavbarHelpComponentBindings {

  searchResults: Array<string>
  helpSearchQuery: string
  isArticleTab: boolean = false
  onClick: () => void
  buttonCallback: () => void
  resultCount: number = 4

  /* @ngInject */

  constructor() {

    this.searchResults = [
      'Lorem ipsum dolor sit amet?',
      'Aenean euismod bibendum laoreet?',
      'Proin sodales pulvinar tempor?',
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus?',
      'How to become an expert?',
      'How to find an expert?',
      'How to call an expert?',
      'How to add an expert to favourites?',
      'How to recommend an expert or consultation?'
    ]

    this.buttonCallback = (): void => {
      if (this.onClick && angular.isFunction(this.onClick)) {
        this.onClick()
      } else {
        throw new Error('onClick is not a function')
      }
    }

  }

  public changeTab = (): void => {
    this.isArticleTab = !this.isArticleTab
  }

}
