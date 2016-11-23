(function($log) {

  const hasImageUrl = (text) => {
    const imageRegexp = /([/|.|\w|\s])*\.(?:jpg|gif|png)/
    return text.match(imageRegexp)
  }

  const getUrls = (text) => {
    const urlRegexp = /(((https?|ftp):\/\/)|(www\.))[^\s$.?#].[^\s]*\.[^\s$.?#].[^\s]*/g
    return _.uniq(text.match(urlRegexp))
  }

  const getCorrectUrl = (url) => {
    const correctUrlRegexp = /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/
    if (!url.match(correctUrlRegexp)) {
      url = 'http://' + url 
    }
    return url
  }

  const handleMessage = (message) => {
    const messageUrls = getUrls(message)

    if (messageUrls && messageUrls.length > 0) {
      for (let url in messageUrls) {
        if (messageUrls.hasOwnProperty(url)) {
          const currentUrl = messageUrls[url]
          const urlRegexp = new RegExp(currentUrl.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), 'g')
          
          if (hasImageUrl(currentUrl)) {
            message = message.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) + '" target="_blank" >' +
              '<img src="' + getCorrectUrl(currentUrl) + '"/></a>')
          } else {
            message = message.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) + '" target="_blank">' + currentUrl + '</a>')
          }
        }
      }
    } 
    return message
  }

  function messageFilter() {
    return function(message) {
      if (!!message && typeof message === 'string') {
        return handleMessage(message)
      } else {
        $log.error('Expected String but got:' + typeof message)
        return ''
      }

    }
  }

  angular.module('profitelo.filters.message-filter', [])
    .filter('message', messageFilter)
}())