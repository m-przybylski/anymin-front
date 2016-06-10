var
  chalk = require('chalk'),
  externalProjectConfig = require('../common-config/config.json'),
  testUrl = externalProjectConfig.urls.frontend + '/login/account'


describe('Service provider', function () {

  beforeEach(function () {
    browser.get(testUrl)

    var phoneNumber = browser.findElement(by.model('ngModel'))
    var form = element(by.name('phoneNumberForm'))
    phoneNumber.sendKeys('000000000')
    form.submit()

    var password = browser.findElement(by.model('ngModel'))
    var form = element(by.name('passwordForm'))

    password.sendKeys('admin123')
    form.submit()

    browser.findElement(by.css('.right-container ul li a')).click()

  })

  afterEach(function () {
    element(by.css('.logout-icon a')).click()
  })

  describe('Individial path', function () {


    beforeEach(function () {

      browser.findElement(by.css('.step-content .option:nth-of-type(1)')).then(function (a,b,c) {
        a.click()
      })
      
    })

    it('should be able to choose path', function () {

      expect(element(by.css('.step-done .icon-person-128')).isPresent()).toBeTruthy();

    })
    
  })


})