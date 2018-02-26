import * as angular from 'angular'
import {IFilterService} from '../../services/filter/filter.service'
import {UrlService} from '../../services/url/url.service'
import {Message} from 'ratel-sdk-js'

describe('Unit testing: profitelo.filters.message-filter>', () => {
  describe('for message >', () => {

    let $filter: IFilterService
    const urlService: UrlService = <UrlService>{}
    const logger = {
      error: (): void => {
      }
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService): void => {
      $provide.value('urlService', urlService)
      $provide.value('logger', logger)
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
        body: 'asdasdasd',
        context: {
          content: 'asdasdasd',
          mimeType: 'plain/text'
        }
      }
      expect($filter('message')(messageObject)).toEqual(messageObject.context.content)
    })

    it('should return html link element', () => {

      const messageObject: Message  = <Message>{
        type: 'message',
        id: 'asdasd',
        context: {
          content: 'asasas',
          type: 'plain/text'
        },
        body: 'asdasdasd'
      }
      const simpleUrl = 'www.kwejk.pl'
      const complexUrl = 'https://www.kołding.pl/search?q=angular3.0&&aqs=chrome.0.69i59j69i57j0l4.766j0j7&sourceid=chrome&ie=UTF-8'

      messageObject.context.content = simpleUrl
      expect($filter('message')(messageObject)).toEqual('<a href="http://' + messageObject.context.content + '" target="_blank">'
        + messageObject.context.content + '</a>')

      messageObject.context.content = complexUrl
      expect($filter('message')(messageObject)).toEqual('<a href="' + messageObject.context.content + '" ' +
        'target="_blank">' + messageObject.context.content + '</a>')
    })

    it('should return html img element', () => {
      const messageObject: Message  = <Message>{
        type: 'message',
        id: 'asdasd',
        context: {
          content: 'asasas',
          type: 'plain/text'
        },
        body: 'asdasdasd'
      }
      const jpg = 'www.zabawneobrazki.pl/asdasdasdasd.jpg'
      const png = 'http://www.kołczingdlaopornych.pl/człowieksukcesu.png'
      const gif = 'https://www.kołczingdlaopornych.pl/człowiekporazka.gif'

      messageObject.context.content = jpg
      expect($filter('message')(messageObject)).toEqual('<a href="http://' + messageObject.context.content
        + '" target="_blank" ><img src="http://' + messageObject.context.content + '"/></a>')

      messageObject.context.content = png
      expect($filter('message')(messageObject)).toEqual('<a href="' + messageObject.context.content
        + '" target="_blank" ><img src="' + messageObject.context.content + '"/></a>')

      messageObject.context.content = gif
      expect($filter('message')(messageObject)).toEqual('<a href="' + messageObject.context.content
        + '" target="_blank" ><img src="' + messageObject.context.content + '"/></a>')
    })

  })
})
