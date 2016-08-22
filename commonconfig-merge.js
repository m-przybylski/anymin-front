var fs = require('fs')

function getJsonObject(val) {
  var inputJson
  if (Object.prototype.toString.call(val) === '[object String]') {
    inputJson = JSON.parse(fs.readFileSync(val, 'utf8'))
  } else if (Object.prototype.toString.call(val) === '[object Object]') {
    inputJson = val
  } else {
    inputJson = new Object()
  }
  return inputJson
}

function deepObjectExtend(target, source) {
  for (var prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (target[prop] && typeof source[prop] === 'object') {
        deepObjectExtend(target[prop], source[prop]);
      }
      else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

var env = process.env.PROFITELO_ENV || 'default'

console.log('Loading ' + env + ' common-config..')

var inputJson = getJsonObject('common-config/config.default.json')

var toMergeJson = getJsonObject('common-config/config.' + env + '.json')

var merged = deepObjectExtend(inputJson, toMergeJson)

fs.writeFileSync('common-config/config.json', JSON.stringify(merged), {
  encoding: 'utf-8'
}, function (error) {
  if (error) {
    console.log(error)
  }
})