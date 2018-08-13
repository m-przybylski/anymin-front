// tslint:disable:readonly-array
import { Injectable } from '@angular/core';
import { CommonConfig } from '../../../../common-config';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';
import { Observable } from 'rxjs';
import { SearchService, GetSuggestedTags, PostSuggestTags } from '@anymind-ng/api';

export enum TagValidationStatus {
  VALID,
  INVALID_MAX_COUNT,
  INVALID_LENGTH,
  INVALID_WORDS_COUNT,
  INVALID_PATTERN,
  DUPLICATED
}

@Injectable()
export class ConsultationTagsComponentService {

  private readonly commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  private readonly maxValidTagsCount = this.commonConfig.validation.consultation['tags-max-count'];
  private readonly minValidTagsCount = this.commonConfig.validation.consultation['tags-min-count'];
  private readonly maxValidTagWords = this.commonConfig.validation.consultation['tag-max-words-count'];
  private readonly minValidTagLength = this.commonConfig.validation.consultation['tag-min-length'];
  private readonly maxValidTagLength = this.commonConfig.validation.consultation['tag-max-length'];
  private readonly tagRegex =
    new RegExp(this.commonConfig.validation.consultation.tag.regex.replace(/\\\\/g, '\\'));

  constructor(private searchService: SearchService) {
  }

  public getSuggestedTags = (query: PostSuggestTags): Observable<GetSuggestedTags> =>
    this.searchService.postTagsSuggestionsRoute(query)

  public getTagValidationStatus = (tag: string, tagsList: string[]): TagValidationStatus => {
    if (this.isTagDuplicated(tag, tagsList)) {
      return TagValidationStatus.DUPLICATED;
    }
    if (this.isTagLengthInvalid(tag)) {
      return TagValidationStatus.INVALID_LENGTH;
    }
    if (this.isTagsMaxCountInvalid(tagsList)) {
      return TagValidationStatus.INVALID_MAX_COUNT;
    }
    if (this.isTagPatternInvalid(tag)) {
      return TagValidationStatus.INVALID_PATTERN;
    }
    if (this.isTagWordsCountInvalid(tag)) {
      return TagValidationStatus.INVALID_WORDS_COUNT;
    }

    return TagValidationStatus.VALID;
  }

  public isTagsMinCountInvalid = (tagsList: string[]): boolean =>
    tagsList.length < this.minValidTagsCount

  private isTagDuplicated = (tag: string, tagsList: string[]): boolean =>
    tagsList.indexOf(tag) !== -1

  private isTagsMaxCountInvalid = (tagsList: string[]): boolean =>
    tagsList.length === this.maxValidTagsCount

  private isTagWordsCountInvalid = (tag: string): boolean =>
    tag.split(' ').length > this.maxValidTagWords

  private isTagLengthInvalid = (tag: string): boolean =>
    tag.length < this.minValidTagLength || tag.length > this.maxValidTagLength

  private isTagPatternInvalid = (tag: string): boolean =>
    !this.tagRegex.test(tag)
}
