/**
 * 패스포트 라우팅 함수 정의
 *
 * @date 2016-11-10
 * @author Mike
 */
  var tem;
module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');

    // 홈 화면
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');
        
        tem=req.user;

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('index.ejs', {login_success:false});
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('index.ejs', {login_success:true});
        }
    });
    router.route('/views/addpost.ejs').get(function(req, res) {

        console.log('req.user의 정보(2)');
        console.dir(req.user.email+"/&/"+req.user.name);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/process/listpost?page=0&perPage=8');
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('addpost.ejs', {writer:req.user.email});
        }
    });

var uuid = require('uuidv4');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
    router.route('/upload').post(multipartMiddleware,function(req, res) {
        var fs = require('fs');
        console.log("IMGUPLOADS_______________________________________________________");
        var orifilepath = req.files.upload.path;
        var orifilename = req.files.upload.name;
        var srvfilename = uuid() + path.extname(orifilename);
        fs.readFile(orifilepath, function (err, data) {
        var newPath = __dirname + '/../public/upload/' + srvfilename;
        fs.writeFile(newPath, data, function (err) {
        if (err) console.log({ err: err });
        else {
        html = "{\"filename\" : \"" + orifilename + "\", \"uploaded\" : 1, \"url\": \"/uploads/" + srvfilename + "\"}"
        console.log(html)
        res.send(html);
        }
        });
        });
        });

        

    router.route('/views/showpost.ejs').post(function(req, res) {

        console.log('req.user의 정보(3)');
    
        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임(3).');
 
            res.redirect('/process/addcomment');
        } else {
            console.log('사용자 인증된 상태임(3).');
           
            res.redirect('/process/addcomment');
        }
    });

    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 요청됨.');
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
	 
    // 회원가입 화면
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
	 
    // 프로필 화면
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
        console.log('req.user 객체의 값');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('/profile 패스 요청됨.');
            console.dir(req.user);

            if (Array.isArray(req.user)) {
                res.render('profile.ejs', {user: req.user[0]._doc});
            } else {
                res.render('profile.ejs', {user: req.user});
            }
        }
    });
	
    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });


    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));

    // 패스포트 - 페이스북 인증 라우팅 
    router.route('/auth/facebook').get(passport.authenticate('facebook', { 
        scope : 'email' 
    }));

    // 패스포트 - 페이스북 인증 콜백 라우팅
    router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));
    

};
// module.exports =function(){
//     if (!tem) {
//            console.log('사용자 인증 안된 상태임(4).');
//            return 0;
//        } else {
//            console.log('사용자 인증된 상태임(4).');
//            return tem.email;
//        }
// }