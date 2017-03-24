import {IProfileGalleryComponentBindings} from './profile-gallery'
import {ModalsService} from '../../../../services/modals/modals.service'

export class ProfileGalleryComponentController implements IProfileGalleryComponentBindings {

  sliders: Array<any>
  slidersLimit: number
  slidersCollapsed: boolean
  slidersCollapsedPhotoLength: number
  slidersLastImage: any

  /* @ngInject */
  constructor(private modalsService: ModalsService) {
    this.slidersLimit = 5
    this.slidersCollapsed = false

    this.sliders = [
      {
        id: '0',
        'content-type': 'image/jpeg',
        downloadUrl: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg',
        token: 'TOKEN-0',
        previews: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg'
      }, {
        id: '1',
        'content-type': 'image/jpeg',
        downloadUrl: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg',
        token: 'TOKEN-1',
        previews: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg'
      }, {
        id: '2',
        'content-type': 'image/jpeg',
        downloadUrl: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg',
        token: 'TOKEN-2',
        previews: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg'
      }, {
        id: '3',
        'content-type': 'image/jpeg',
        downloadUrl: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg',
        token: 'TOKEN-3',
        previews: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg'
      },{
        id: '4',
        'content-type': 'image/jpeg',
        downloadUrl: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg',
        token: 'TOKEN-4',
        previews: 'https://images.gutefrage.net/media/fragen/bilder/wie-heissen-die-suessen-wale-auf-instagram/0_original.jpg'
      }, {
        id: '5',
        'content-type': 'image/jpeg',
        downloadUrl: 'https://static.goldenline.pl/user_photo/100/user_1438564_8bc6e0_huge.jpg',
        token: 'TOKEN-5',
        previews: 'https://static.goldenline.pl/user_photo/100/user_1438564_8bc6e0_huge.jpg'
      }, {
        id: '6',
        'content-type': 'image/jpeg',
        downloadUrl: 'https://static.goldenline.pl/user_photo/100/user_1438564_8bc6e0_huge.jpg',
        token: 'TOKEN-6',
        previews: 'https://static.goldenline.pl/user_photo/100/user_1438564_8bc6e0_huge.jpg'
      }
    ]

    this.slidersCollapsedPhotoLength = this.sliders.length - this.slidersLimit - 1

    if (this.sliders.length > this.slidersLimit) {
      this.slidersCollapsed = true
      this.slidersLastImage = this.sliders[this.slidersLimit]
    }
  }

  public createGalleryPreviewControllerModal = (slide: any): void => {
    this.modalsService.createGalleryPreviewControllerModal(slide.previews)
  }
}
