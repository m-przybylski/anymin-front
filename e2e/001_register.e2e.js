var
  chalk = require('chalk'),
  externalProjectConfig = require('../common-config/config.json'),
  statePath = '/login/account',
  testUrl = externalProjectConfig.urls.frontend + statePath

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('Sign-up page', function () {
  it('should get dummy text', function () {
    browser.get(testUrl)
    var text = browser.findElement(by.css('.top-div h5'))
    expect(text.getText()).toEqual('Zaufaj ekspertom i rozwiąż swoje problemy')
  })


  it('should redirect to register page for unregistered number', function () {
    var phoneNumber = browser.findElement(by.model('ngModel'))
    var form = element(by.name('phoneNumberForm'))
    phoneNumber.sendKeys(getRandomInt(500000000, 999999999))
    form.submit()
    var text = browser.findElement(by.css('.pro-input-form .input-group label'))

    expect(text.getText()).toEqual('WPISZ KOD WERYFIKACYJNY Z SMSA')

  })

  it('should login to a known account', function () {

    browser.get(testUrl)

    var phoneNumber = browser.findElement(by.model('ngModel'))
    var form = element(by.name('phoneNumberForm'))
    phoneNumber.sendKeys('000000000')
    form.submit()

    var password = browser.findElement(by.model('ngModel'))
    var form = element(by.name('passwordForm'))

    password.sendKeys('admin123')
    form.submit()

    expect(element(by.css('.dashboard-menu')).isPresent()).toBeTruthy()

    element(by.css('.logout-icon a')).click()

  })




})