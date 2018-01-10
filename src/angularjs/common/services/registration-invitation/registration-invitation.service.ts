import {LocalStorageWrapper} from '../../classes/local-storage-wrapper/local-storage-wrapper'
import {IInvitationObject} from '../../../app/invitations/invitation.interface'

export class RegistrationInvitationService {

    constructor(private $log: ng.ILogService) {
  }

  public getInvitationObject = (): IInvitationObject | undefined => {
    const stringifyInvitationObject = LocalStorageWrapper.getItem('invitation')

    if (stringifyInvitationObject) {
      try {
        return JSON.parse(stringifyInvitationObject)
      } catch (error) {
        this.$log.error(error)
      }
    }
    return undefined
  }
}
