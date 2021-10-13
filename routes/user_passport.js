

var tem;
module.exports = function (router, passport) {
	var fs=require('fs');
    console.log('user_passport 호출됨.');

    // 홈 화면
    router.route('/').get(function (req, res) {

        tem = req.user;
        // 인증 안된 경우
        if (!req.user) {
           //res.render('test.ejs', { login_success: false});
            res.render('index.ejs', { login_success: false});
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('index.ejs', { login_success: true, admin:req.user.admin  });
        }
    });


    router.route('/addhistory').get(function (req, res) {
        res.render('history/historyOfBook.ejs', { writer: req.user.email, post: null });
    });

    router.route('/views/bookHistoryGallery.ejs').get(function (req, res) {
        //기능 테스트 용도(사용전 테스트)
    

        var database = req.app.get('database');

        if (database.db) {
            database.UserModel.findOne({email:req.user.email}).populate('reservationlist', 'title author updated_at').exec(function (err, results) {
                if (err) {
                    console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                    // printer.errrendering(res,err);

                    return;
                }

                res.render('history/bookHistoryGallery.ejs', { login_success: true, posts: results });
            });
        } else {
            // printer.errrendering(res);
        }
    });

    router.route('/views/addpost.ejs').get(function (req, res) {
        // 인증 안된 경우
        if (!req.user) {
            
            res.redirect('/process/listpost?page=0&perPage=8');
        } else {
      
            res.render('addpost.ejs', { writer: req.user.email });
        }
    });
    router.route('/views/addbook.ejs').get(function (req, res) {
        // 인증 안된 경우
        if (!req.user) {
           
            res.redirect('/book/listpost?page=0&perPage=8');
        } else {
           

            res.render('addBook.ejs', { writer: req.user.email, group: req.user.group });
        }
    });
    router.route('/views/applyNewBook.ejs').get(function (req, res) {
        // 인증 안된 경우
        if (!req.user) {
         
            res.redirect('/');
        } else {
			var NEXT;
           if(req.query.request==0){
			   NEXT="책 찾기";
		   }else if(req.query.request==1){
			   NEXT="책 신청";
		   }else if(req.query.request==2){
			   NEXT="ISBN 검색"
		   }else{
			   	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        		res.write('<h2>검색 오류</h2>');
        		res.end();
		   }
			
            res.render('applyNewBook.ejs', { NEXT: NEXT});
        }
    });
    router.route('/dev/addAnnouncement.ejs').get(function (req, res) {
        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            
            res.render('addAnnouncement.ejs', { writer: "개발자", group: 'ROOT' , link:'dev'});
        }
    });
    router.route('/admin/addAnnouncement.ejs').get(function (req, res) {
        // 인증 안된 경우
        if (!req.user) {
          
            res.redirect('/');
        } else {
            res.render('addAnnouncement.ejs', { writer: req.user.email, group: req.user.group ,link:'admin'});
        }
    });
    router.route('/views/showpost.ejs').post(function (req, res) {
        // 인증 안된 경우
        if (!req.user) {

       	 res.redirect('/process/addcomment');
        } else {
            res.redirect('/process/addcomment');
        }
    });
	// router.route('/user/admin').get(function (req, res) {
		
	// res.render('adminPage.ejs');
      
	// });
  	router.route('/vue').get(function (req, res) {
       
		console.log('/vue 패스 요청됨.');
        res.render('vue.ejs');
    });
	
    // 로그인 화면
    router.route('/login').get(function (req, res) {
        console.log('/login 패스 요청됨.');
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // 회원가입 화면
    router.route('/signup').get(function (req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    router.route('/signupAdmin').get(function (req, res) {
        console.log('/signupAdmin 패스 요청됨.');
        res.render('signupAdmin.ejs', { message: req.flash('signupMessage') });
    });

    // 프로필 화면
    router.route('/profile').get(function (req, res) {
		const directory= 'uploads'; 
		
		
		
        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
		var database = req.app.get('database');
        // 인증 안된 경우
        if (!req.user) {

            res.redirect('/');
        } else {
    		if (database.db) {
				 
				 
                database.UserModel.findOne({email:req.user.email}).populate('reservationlist', 'title author updated_at').exec(function (err, results) {
                    if (err) {
                        console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                        printer.errrendering(res, err);
        
                        return;
                    }
					fs.readdir(directory, function(err, filelist){

						if(filelist.includes(results.profile_path)){
							res.render('profile.ejs', { user: req.user,  admin:req.user.admin, posts:results, login_success: true, profile:'uploads/'+results.profile_path  });
						}else{
							res.render('profile.ejs', { user: req.user,  admin:req.user.admin, posts:results, login_success: true,  profile:'uploads/public/images/pic05.jpg'  });
						}
					});
					 
                });
				
            } else {
                printer.errrendering(res);
            }

            
            var user = req.user.email;
            var database = req.app.get('database');
    
        }
    });
	
    // 로그아웃
    router.route('/logout').get(function (req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });

    // 로그인 인증
    router.route('/login').post(
        passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true,
        })
    );

    // 회원가입 인증
    router.route('/signup').post(
        passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup',
            failureFlash: true,
        })
    );

    router.route('/signupAsAdmin').post(
        passport.authenticate('local_signup_admin', {
            successRedirect: '/profile',
            failureRedirect: '/signupAsAdmin',
            failureFlash: true,
        })
    );
};

