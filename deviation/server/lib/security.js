//	, salt = randomString(128)
//	, salted_sha512 = hash.sha512(password, salt)

var checkPassword = function(password, callback) {
	var hash = require('node_hash')

	;(hash.sha512(password, app.security.salt) === app.security.salted_sha512)
		? answer = true
		: answer = false
	callback(answer)
}

exports.checkPassword = checkPassword