var Entities = require('html-entities').AllHtmlEntities;
var currentPage=0;

var addbook = function(req, res) {
	console.log('book 모듈 안에 있는 addbook 호출됨.');
 
    var paramContents = req.body.contents || req.query.contents;
	var paramWriter =req.user.email;
	var paramTitle = req.body.title || req.query.title;
	var paramAuthor = req.body.author || req.query.author;

	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		if(req.isAuthenticated==false){
			return res.redirect('/'); 
		}
		if(paramTitle==null||paramContents==null){
			return res.redirect('/book/listpost?page=0&perPage=8'); 
		}
		// 1. 아이디를 이용해 사용자 검색
		database.UserModel.findByEmail(paramWriter, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }

			if (results == undefined || results.length < 1) {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 [' + paramWriter + ']를 찾을 수 없습니다.</h2>');
				res.end();
				
				return;
			}
			
			var userObjectId = results[0]._doc._id;
			

			var book = new database.BookModel({
				title: paramTitle,
				contents: paramContents,
				writer: userObjectId,
				which : paramWriter,
				author:paramAuthor,
				num: '0'
			});

			book.savePost(function(err, result) {
				if (err) {
                    
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    
                }
			   console.log(result);
			    return res.redirect('/book/showbook/' + book._id); 
			});
			
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};
var listpost = function(req, res) {
	console.log('book 모듈 안에 있는 listpost 호출됨.');
  
    var paramPage = req.body.page || req.query.page||'err';
	var paramPerPage = 8
	
	// req.body.perPage || req.query.perPage;
	
	var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
		
		database.BookModel.list(options, function(err, results) {
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 목록 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
				//console.log('###요청 파라미터(result):\n ' +results);
				//console.dir(results);
				for(var i=0;i<results.length;i++){
					if(results[i].writer==null){
						;
						results[i].writer={name:'(알수없음)',email:'unknown'};}
				}
				// 전체 문서 객체 수 확인
				database.BookModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage						
					};
					currentPage=context.page;
					body=context;
					//console.log('요청 파라미터(currentPage) ------> ' +currentPage);
				
					req.app.render('listbook', context, function(err, html) {
                        if (err) {
                            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                            res.write('<p>' + err.stack + '</p>');
                            res.end();

                            return;
                        }
						
    
						res.end(html);
					});
					
				});
				
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};


var showbook = (req, res) => {
	console.log('book 모듈 안에 있는 showbook 호출됨.');


	// URL 파라미터로 전달됨
	var paramId = req.body.id || req.query.id || req.params.id;
	currentId = paramId;
	var login = req.isAuthenticated();
    var userEmail=req.user.email;
	
	var database = req.app.get('database');
	if(req.isAuthenticated()){
		// 데이터베이스 객체가 초기화된 경우
		if (database.db) {
			// 1. 글 리스트

			database.BookModel.load(paramId, function (err, results) {

				if (err) {
					console.log('error');
					console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);

					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					res.write('<h2>게시판 글 조회 중 에러 발생</h2>');
					res.write('<p>' + err.stack + '</p>');
					res.end();

					return;
				}
				if(results.writer==null){results.writer={email:'none',name:'none'};
			}else if(results.writer.email==null){
				results.writer={email:'none',name:'none'}
			}
				if (results) {

					database.BookModel.incrHits(results._doc._id, function (err2, results2) {
						console.log('incrHits executed.');

						if (err2) {
							console.log('incrHits 실행 중 에러 발생.');
							console.dir(err2);
							return;
						}

					});

					//+
					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					if(results===null){
						res.redirect('/');
					}
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 조회 ',
						posts: results,
						page: currentPage,
						login_success: login,
						user:userEmail,
						Entities: Entities
					};
					console.log("num:"+results.num);
					body = context;

					database.UserModel.load(userEmail, function(err, results) {
						if(results._id=='60534ecb612a073c1403ccb9'){
							req.app.render('adminshowpost', context, function (err, html) {
								if (err) {
									console.log('context:'+context.posts);
									
									console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack+"//");
		
									return;
								}
								res.end(html);
							});
						}else{
							req.app.render('showBook', context, function (err, html) {
								if (err) {
									console.log('context:'+context.posts);
									
									console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack+"//");
		
									return;
								}
								res.end(html);
							});
						}
		
					});

					
					

				} else {
					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					res.write('<h2>글 조회  실패</h2>');
					res.end();
				}
			});
		} else {
			res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
			res.write('<h2>데이터베이스 연결 실패</h2>');
			res.end();
		}
	}else{
		alert("로그인을 해주십시오");
		res.redirect('/');
	
	}
};

var borrow = function(req, res) {
	console.log('book 모듈 안에 있는 borrow 호출됨.');

	var paramId = req.body.id || req.query.id || req.params.id;
	var user=req.user.email;
	var database = req.app.get('database');

	if (database.db) {


		var reservation = new database.ReservationModel({
			bookInfo:paramId,
			user:user,
		});

		reservation.savePost(function(err, result) {
			if (err) {
				
					console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
					res.write('<p>' + err.stack + '</p>');
					res.end();

					return;
			}
			console.log(result);
		});


		database.BookModel.findByIdAndUpdate(paramId,{$set: {num : '1'}}, function(err){
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>업데이트 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			
			res.redirect('/book/showbook/' + paramId); 
		});

		database.UserModel.load(user, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			
			database.UserModel.findByIdAndUpdate(results._id,	{'$push': {'reservationlist':paramId}},
			{'new':true, 'upsert':true},  function(err, results2) {
			
			if (err) {
				console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
				
				return;
			}
			
			});
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


var addReview = function(req, res) {
	console.log('book 모듈 안에 있는 addReview 호출됨.');
 
    var paramId = req.body.id || req.query.id;
    var paramContents = req.body.contents || req.query.contents;
    var paramWriter = req.user.email;
	var Writer = req.user.name;
	var database = req.app.get('database');

	if (database.db) {
		database.BookModel.findByIdAndUpdate(paramId,
            {'$push': {'review':{'contents':paramContents, 'writer':paramWriter, 'writername':Writer}}},
            {'new':true, 'upsert':true},
            function(err, results) {
                if (err) {
                    console.error('게시판 댓글 추가 중 에러 발생 : ' + err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>게시판 댓글 추가 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                }


                return res.redirect('/book/showbook/' + paramId); 
        });
 
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};
var reservation = function(req, res) {
	console.log('book 모듈 안에 있는 reservation 호출됨.');

	var paramId = req.body.id || req.query.id || req.params.id;
	var reserve = req.user.email;
	var database = req.app.get('database');

	if (database.db) {





		database.BookModel.findByIdAndUpdate(paramId,{$set: {num : '2', reservation:reserve}}, function(err,result){
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>업데이트 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}

			res.redirect('/book/showbook/' + paramId); 
		});
	
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};
var reservationList = function(req, res) {
	console.log('book 모듈 안에 있는 reservationList 호출됨.');

	var user=req.user.email;
	var database = req.app.get('database');

	if (database.db) {

		database.UserModel.load(user, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			console.log('reservationList:'+results.reservationlist);

			var context = {
				posts: results,
			};
			
			req.app.render('myPage.ejs', context, function (err, html) {
				
				if (err) {
					
					
					console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack+"//");
					return;
				}
				res.end(html);
			});
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};
var giveBack = function(req, res) {
	console.log('book 모듈 안에 있는 giveBack 호출됨.');

	var paramId = req.body.id || req.query.id || req.params.id;
	var user=req.user.email;
	var database = req.app.get('database');

	if (database.db) {
	
		database.BookModel.findByIdAndUpdate(paramId,{$set: {num : '0'}}, function(err){
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>업데이트 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			
		
		});

			database.UserModel.load(user, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			
			database.UserModel.findByIdAndUpdate(results._id,{ $pull: { "reservationlist" :  paramId } }

			,  function(err, results2) {
				
			if (err) {
				console.error('에러 발생 : ' + err.stack);
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
				
				return;
			}
			console.log(paramId+"/"+results2);
			});
		});
		res.redirect("/views/myPage.ejs"); 
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};
module.exports.listpost = listpost;
module.exports.addbook = addbook;
module.exports.showbook = showbook;
module.exports.borrow = borrow;
module.exports.reservation = reservation;
module.exports.addReview = addReview;
module.exports.reservationList = reservationList;
module.exports.giveBack = giveBack;

