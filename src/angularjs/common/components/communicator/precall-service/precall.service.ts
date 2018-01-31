import { IModalInstanceService } from 'angular-ui-bootstrap';
import { GetService, GetProfile } from 'profitelo-api-ng/model/models';
import { RtcDetectorService } from '../../../services/rtc-detector/rtc-detector.service';
import { ModalsService } from '../../../services/modals/modals.service';
import { MediaStreamConstraintsWrapper } from '../../../classes/media-stream-constraints-wrapper';

// tslint:disable:member-ordering
export class PrecallService {

  public static $inject = ['rtcDetectorService', 'modalsService'];

    constructor(private rtcDetectorService: RtcDetectorService,
              private modalsService: ModalsService) {
  }

  public openPrecallModal = (serviceDetails: GetService, expertDetails: GetProfile):
    ng.IPromise<IModalInstanceService> =>
    this.rtcDetectorService.getMedia(MediaStreamConstraintsWrapper.getDefault()).then((stream) =>
      this.modalsService.createPrecallModal(serviceDetails, expertDetails, stream)
    )
}
