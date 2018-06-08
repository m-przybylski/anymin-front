import { ITagsListBindings } from './tags-list';
import { GetTag } from 'profitelo-api-ng/model/models';

// tslint:disable:member-ordering
export class TagsListComponentController implements ITagsListBindings {

  public readonly defaultMobileTagsLimit = 7;
  private static readonly maxVisibleTags = 30;

  public tags: GetTag[];
  public tagsLimit = this.defaultMobileTagsLimit;
  public static $inject = [];

  constructor() {

  }

  public showMoreTags = (): void => {
    this.tagsLimit = TagsListComponentController.maxVisibleTags;
  }

  public hideTags = (): void => {
    this.tagsLimit = this.defaultMobileTagsLimit;
  }

}
