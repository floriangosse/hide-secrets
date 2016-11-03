var traverse = require('traverse')

var BAD_WORDS = [
  'password',
  'pass',
  'token',
  'auth',
  'secret',
  'passphrase',
  'card'
]

var replacement = '[SECRET]'

function hide (obj, opts) {
  opts = opts || {}
  opts.badWords = opts.badWords || hide.BAD_WORDS

  return traverse(obj).map(function (n) {
    for (var i = 0, key; (key = this.path[i]) !== undefined; i++) {
      if (~opts.badWords.indexOf(key)) {
        if (typeof n === 'string') return replaceString(n)
      }
    }
  })
}

hide.BAD_WORDS = BAD_WORDS

function replaceString (str) {
  if (str) return replacement
}

module.exports = hide
