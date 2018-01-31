import { ITagsListBindings } from './tags-list';
import { Tag } from 'profitelo-api-ng/model/models';

export class TagsListComponentController implements ITagsListBindings {

  public readonly defaultMobileTagsLimit: number = 7;
  private static readonly maxVisibleTags: number = 30;

  public tags: Tag[];
  public tagsLimit: number = this.defaultMobileTagsLimit;
  static $inject = [];

  constructor() {

  }

  public showMoreTags = (): void => {
    this.tagsLimit = TagsListComponentController.maxVisibleTags;
  }

  public hideTags = (): void => {
    this.tagsLimit = this.defaultMobileTagsLimit;
  }

}
