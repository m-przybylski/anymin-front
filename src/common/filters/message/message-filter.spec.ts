import * as angular from 'angular'
import {IFilterService} from '../../services/filter/filter.service'
import {UrlService} from '../../services/url/url.service'
import {Message} from 'ratel-sdk-js'

describe('Unit testing: profitelo.filters.message-filter>', () => {
  describe('for message >', () => {

    let $filter: IFilterService
    const urlService: UrlService = <UrlService>{}

    beforeEach(angular.mock.module( ($provide: ng.auto.IProvideService): void => {
      $provide.value('urlService', urlService)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.filters.message-filter')
    })

    beforeEach(inject((_$filter_: IFilterService) => {
      $filter = _$filter_
    }))

    it('should return message', () => {
      const messageObject: Message  = <Message>{
        type: 'message',
        id: 'asdasd',
        body: 'asdasdasd'
      }
      expect($filter('message')(messageObject)).toEqual(messageObject.body)
    })

    it('should return html link element', () => {

      const messageObject: Message  = <Message>{
        type: 'message',
        id: 'asdasd',
        body: 'asdasdasd'
      }
      const simpleUrl = 'www.kwejk.pl'
      const complexUrl = 'https://www.kołding.pl/search?q=angular3.0&&aqs=chrome.0.69i59j69i57j0l4.766j0j7&sourceid=chrome&ie=UTF-8'

      messageObject.body = simpleUrl
      expect($filter('message')(messageObject)).toEqual('<a href="http://' + messageObject.body + '" target="_blank">'
        + messageObject.body + '</a>')

      messageObject.body = complexUrl
      expect($filter('message')(messageObject)).toEqual('<a href="' + messageObject.body + '" ' +
        'target="_blank">' + messageObject.body + '</a>')
    })

    it('should return html img element', () => {
      const messageObject: Message  = <Message>{
        type: 'message',
        id: 'asdasd',
        body: 'asdasdasd'
      }
      const jpg = 'www.zabawneobrazki.pl/asdasdasdasd.jpg'
      const png = 'http://www.kołczingdlaopornych.pl/człowieksukcesu.png'
      const gif = 'https://www.kołczingdlaopornych.pl/człowiekporazka.gif'

      messageObject.body = jpg
      expect($filter('message')(messageObject)).toEqual('<a href="http://' + messageObject.body
        + '" target="_blank" ><img src="http://' + messageObject.body + '"/></a>')

      messageObject.body = png
      expect($filter('message')(messageObject)).toEqual('<a href="' + messageObject.body
        + '" target="_blank" ><img src="' + messageObject.body + '"/></a>')

      messageObject.body = gif
      expect($filter('message')(messageObject)).toEqual('<a href="' + messageObject.body
        + '" target="_blank" ><img src="' + messageObject.body + '"/></a>')
    })

  })
})
