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
      const string = 'abcdefghijk'
      
      expect($filter('message')(string)).toEqual(string)
    })

    it('should return html link element', () => {
      const simpleUrl = 'www.kwejk.pl'
      const complexUrl = 'https://www.kołding.pl/search?q=angular3.0&&aqs=chrome.0.69i59j69i57j0l4.766j0j7&sourceid=chrome&ie=UTF-8'
      
      expect($filter('message')(simpleUrl)).toEqual('<a href="http://'  + simpleUrl + '" target="_blank">' + simpleUrl + '</a>')
      expect($filter('message')(complexUrl)).toEqual('<a href="' + complexUrl + '" target="_blank">' + complexUrl + '</a>')
    })

    it('should return html link element', () => {
      const jpg = 'www.zabawneobrazki.pl/asdasdasdasd.jpg'
      const png = 'http://www.kołczingdlaopornych.pl/człowieksukcesu.png'
      const gif = 'https://www.kołczingdlaopornych.pl/człowiekporazka.gif'
      
      expect($filter('message')(jpg)).toEqual('<a href="http://' + jpg + '" target="_blank" ><img src="http://' + jpg + '"/></a>')
      expect($filter('message')(png)).toEqual('<a href="' + png + '" target="_blank" ><img src="' + png + '"/></a>')
      expect($filter('message')(gif)).toEqual('<a href="' + gif + '" target="_blank" ><img src="' + gif + '"/></a>')
    })

  })
})