import {IProfileHeaderComponentBindings} from './profile-header'
import {GetExpertDetails} from 'profitelo-api-ng/model/models'

export class ProfileHeaderComponentController implements IProfileHeaderComponentBindings {

  profileDetails?: GetExpertDetails
  isFavourite: boolean
  onLike: () => void

  /* @ngInject */
  constructor() {

  }
}
