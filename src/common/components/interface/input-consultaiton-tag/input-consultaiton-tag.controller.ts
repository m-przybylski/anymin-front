import {IInputConsultationTagBindings} from './input-consultaiton-tag'
import {SearchApi} from 'profitelo-api-ng/api/api'
import {PostSuggestTags, GetSuggestedTags} from 'profitelo-api-ng/model/models'
import * as angular from 'angular'
import {PromiseService} from '../../../services/promise/promise.service'

export class InputConsultationTagComponentController implements IInputConsultationTagBindings {
  public selectedTags: string[] = []
  public suggestedTags: string[] = []
  public tagModel: string
  public isValid?: boolean
  public validationText?: string
  public isDirty: boolean
  public isFocus: boolean
  public isInputValueInvalid: boolean
  public isSubmitted: boolean
  public isSuggestedTagsLoading: boolean
  public serviceName: string
  public serviceDescription: string

  private static readonly suggestedTagsLimit = 7
  private static readonly suggestedTagsLoaderDelay = 500
  private cacheSuggestedTags?: PostSuggestTags

  /* @ngInject */
  constructor(private SearchApi: SearchApi,
              private promiseService: PromiseService,
              private $log: ng.ILogService) {
  }

  public onEnter = (): void => {
    if (this.tagModel.length > 0 && !(this.selectedTags.indexOf(this.tagModel) !== -1)) {
      this.selectedTags.push(this.tagModel)
      this.isInputValueInvalid = false
      this.tagModel = ''
      this.updateSuggestedTags()
    } else {
      this.isInputValueInvalid = true
    }
  }

  public addSelectedItem = (item: string, index: number): void => {
    if (this.selectedTags.indexOf(item) === -1) {
      this.selectedTags.push(item)
      this.isInputValueInvalid = false
      this.suggestedTags.splice(index, 1)
      this.updateSuggestedTags()
    }
  }

  public onBlur = (): void => {
    this.isDirty = true
    this.isFocus = false
    this.isInputValueInvalid = false
  }

  public onFocus = (): void => {
    this.updateSuggestedTags()
    this.isFocus = true
  }

  public deleteSelectedItem = (index: number): void => {
    this.selectedTags.splice(index, 1)
    this.updateSuggestedTags()
  }

  private updateSuggestedTags = (): void => {
    const tagsQuery = {
      description: this.serviceDescription,
      query: this.serviceName || '',
      count: InputConsultationTagComponentController.suggestedTagsLimit,
      tags: this.selectedTags
    }

    if (!this.isSuggestedTagsLoading
      && this.checkIsDataForQueryTagsExist()
      && !this.cacheSuggestedTags
      || this.checkIsQueryForTagsChange(tagsQuery)) {
      this.isSuggestedTagsLoading = true
      this.promiseService.setMinimalDelay(this.SearchApi.postTagsSuggestionsRoute(tagsQuery),
        InputConsultationTagComponentController.suggestedTagsLoaderDelay)
      .then((suggestedTags) => {
        this.onPostTagsSuggestions(suggestedTags, tagsQuery)
      }, this.onPostTagsSuggestionsError).finally(() => {
        this.isSuggestedTagsLoading = false
      })
    }
  }

  private checkIsQueryForTagsChange = (tagsQuery: PostSuggestTags): boolean =>
    this.cacheSuggestedTags !== undefined &&
    (tagsQuery.description !== this.cacheSuggestedTags.description
    || tagsQuery.query !== this.cacheSuggestedTags.query
    || this.cacheSuggestedTags.tags && this.cacheSuggestedTags.tags.length !== tagsQuery.tags.length)

  private checkIsDataForQueryTagsExist = (): boolean =>
    this.serviceName !== undefined || this.selectedTags && this.selectedTags.length > 0

  private onPostTagsSuggestions = (suggestedTags: GetSuggestedTags, tagsQuery: PostSuggestTags): void => {
    this.suggestedTags = suggestedTags.tags
    this.cacheSuggestedTags = angular.copy(tagsQuery)
  }

  private onPostTagsSuggestionsError = (error: any): void => {
    this.$log.error(error)
  }
}
