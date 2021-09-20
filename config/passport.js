var local_login = require('./passport/local_login');
var local_login_admin = require('./passport/local_login_admin');
var local_signup = require('./passport/local_signup');
var local_signup_admin = require('./passport/local_signup_admin');

module.exports = function (app, passport) {
	passport.serializeUser(function (user, done) {
		console.log('serializeUser() 호출됨.');
		done(null, user);
	});
	var email;

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	// 인증방식 설정
	passport.use('local-login', local_login);
	passport.use('local_login_admin', local_login_admin);
	passport.use('local-signup', local_signup);
	passport.use('local_signup_admin', local_signup_admin);
};