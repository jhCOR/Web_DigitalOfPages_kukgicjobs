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

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/process/listpost?page=0&perPage=8');
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('addpost.ejs', {writer:req.user.email});
        }
    });
    router.route('/views/addbook.ejs').get(function(req, res) {

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/book/listpost?page=0&perPage=8');
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('addBook.ejs', {writer:req.user.email, group:req.user.group});
        }
    });
	    router.route('/views/applyNewBook.ejs').get(function(req, res) {

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('applyNewBook.ejs');
        }
    });

    router.route('/views/showpost.ejs').post(function(req, res) {
    
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
	
	  router.route('/signupAdmin').get(function(req, res) {
        console.log('/signupAdmin 패스 요청됨.');
        res.render('signupAdmin.ejs', {message: req.flash('signupMessage')});
    });
	 
    // 프로필 화면
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('/profile 패스 요청됨.');
           // console.dir(req.user);

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

	   router.route('/signupAsAdmin').post(passport.authenticate('local_signup_admin', {
        successRedirect : '/profile', 
        failureRedirect : '/signupAsAdmin', 
        failureFlash : true 
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