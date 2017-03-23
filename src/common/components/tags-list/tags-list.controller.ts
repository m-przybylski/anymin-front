import {ITagsListBindings} from './tags-list'
import { Tag } from 'profitelo-api-ng/model/models'
export class TagsListComponentController implements ITagsListBindings {

  public tags: Array<Tag>
  /* @ngInject */
  constructor() {

  }

}
