describe('Unit testing: profitelo.filters.message-filter>', () => {
  describe('for message >', () => {

    let $filter

    beforeEach(() => {
      module('profitelo.filters.message-filter')
    })

    beforeEach(inject((_$filter_) => {
      $filter = _$filter_
    }))

    it('should return message', () => {
      const object = {
        body: 'abcdefghijk'
      }
      const string = JSON.stringify(object)
      expect($filter('message')(string)).toEqual(object.body)
    })

    it('should return html link element', () => {
      let string = ''
      const object = {}
      const simpleUrl = 'www.kwejk.pl'
      const complexUrl = 'https://www.kołding.pl/search?q=angular3.0&&aqs=chrome.0.69i59j69i57j0l4.766j0j7&sourceid=chrome&ie=UTF-8'

      object.body = simpleUrl
      string = JSON.stringify(object)
      expect($filter('message')(string)).toEqual('<a href="http://'  + object.body + '" target="_blank">' + object.body + '</a>')

      object.body = complexUrl
      string = JSON.stringify(object)
      expect($filter('message')(string)).toEqual('<a href="' + object.body + '" target="_blank">' + object.body + '</a>')
    })

    it('should return html img element', () => {
      let string = ''
      const object = {}
      const jpg = 'www.zabawneobrazki.pl/asdasdasdasd.jpg'
      const png = 'http://www.kołczingdlaopornych.pl/człowieksukcesu.png'
      const gif = 'https://www.kołczingdlaopornych.pl/człowiekporazka.gif'
      
      object.body = jpg
      string = JSON.stringify(object)
      expect($filter('message')(string)).toEqual('<a href="http://' + object.body + '" target="_blank" ><img src="http://' + object.body + '"/></a>')
      
      object.body = png
      string = JSON.stringify(object)
      expect($filter('message')(string)).toEqual('<a href="' + object.body + '" target="_blank" ><img src="' + object.body + '"/></a>')
      
      object.body = gif
      string = JSON.stringify(object)
      expect($filter('message')(string)).toEqual('<a href="' + object.body + '" target="_blank" ><img src="' + object.body + '"/></a>')
    })

  })
})