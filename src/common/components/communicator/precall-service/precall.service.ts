import {IModalInstanceService} from 'angular-ui-bootstrap'
import {GetService, GetProfile} from 'profitelo-api-ng/model/models';
import {RtcDetectorService} from '../../../services/rtc-detector/rtc-detector.service'
import {ModalsService} from '../../../services/modals/modals.service'

export class PrecallService {

  /* @ngInject */
  constructor(private rtcDetectorService: RtcDetectorService,
              private modalsService: ModalsService) {
  }

  public openPrecallModal = (serviceDetails: GetService, expertDetails: GetProfile):
    ng.IPromise<IModalInstanceService> =>
    this.rtcDetectorService.getAllMediaPermissions().then(() =>
      this.modalsService.createPrecallModal(serviceDetails, expertDetails)
    )
}
