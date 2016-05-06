angular.module('profitelo.services.commonSettings', [])
.factory('CommonSettingsService', CommonSettingsService)

function CommonSettingsService() {
  let _settings = {
    
  }

  let _localSettings = {
    emailPattern: "^([a-z0-9!#$%&'*+/=?^_`{|}~.-]+)@([a-z0-9-]+)\\.([a-zA-Z.]+)$",
    passwordPattern: '^.{6,64}$',
    pinPattern: '\d{4}',
    phonePattern: '[0-9]{9,9}',
    smsCodePattern: '[0-9]{4}',
    urlPattern: /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/,
    socialNetworks: [
      {
        iconClass: 'icon-behance-24',
        name: 'Behance',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?behance\.\w+/gi)
      }, {
        iconClass: 'icon-pinterest-24',
        name: 'pinterest',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?pinterest\.\w+/gi)
      }, {
        iconClass: 'icon-dribbble-24',
        name: 'dribbble',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?dribbble\.\w+/gi)
      }, {
        iconClass: 'icon-flickr-24',
        name: 'flickr',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?flickr\.\w+/gi)
      }, {
        iconClass: 'icon-wordpress-24',
        name: 'wordpress',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?wordpress\.\w+/gi)
      }, {
        iconClass: 'icon-blogspot-24',
        name: 'blogspot',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?blogspot\.\w+/gi)
      }, {
        iconClass: 'icon-twitter-24',
        name: 'Twitter',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?twitter\.\w+/gi)
      }, {
        iconClass: 'icon-facebook-24',
        name: 'facebook',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?facebook\.\w+/gi)
      }, {
        iconClass: 'icon-google-plus',
        name: 'google',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?plus\.google\.\w+/gi)
      }, {
        name: 'icon-linkedin-24',
        iconClass: 'linkedin',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?linkedin\.\w+/gi)
      }, {
        iconClass: 'icon-goldenline-24',
        name: 'GoldenLine',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?goldenline\.\w+/gi)
      }, {
        iconClass: 'icon-github-24',
        name: 'Github',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?github\.\w+/gi)
      }, {
        iconClass: 'icon-bitbucket-24',
        name: 'BitBucket',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?bitbucket\.\w+/gi)
      }, {
        iconClass: 'icon-stackoverflow-24',
        name: 'StackOverflow',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?stackoverflow\.\w+/gi)
      }, {
        iconClass: 'icon-tumblr-24',
        name: 'Tumblr',
        pattern: new RegExp(/((https?:\/\/)|([w]{3}\.))?tumblr\.\w+/gi)
      }, {
        iconClass: 'icon-www-24',
        name: 'Website'
      }
    ]
  }

  return {
    get: function(property) {
      return angular.copy(_settings[property])
    },
    localSettings: _localSettings
  }


}
