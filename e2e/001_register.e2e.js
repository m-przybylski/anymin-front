var
  chalk = require('chalk'),
  externalProjectConfig = require('../common-config/config.json'),
  statePath = 'http://localhost:4242/login/account',
  testUrl = statePath

describe('Sign-up page', function () {
  it('should get dummy text', function () {
    browser.get(testUrl)
    var text = browser.findElement(by.css('.top-div h5'))
    expect(text.getText()).toEqual('Zaufaj ekspertom i rozwiąż swoje problemy')
  })
})