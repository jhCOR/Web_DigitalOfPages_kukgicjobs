/*
 * 게시판을 위한 라우팅 함수 정의
 */

// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;
const isLoggedIn=require('./middlewares');

var currentPage=0;
var currentId;
var body;
var scrapNum;
var commentWriter;
var addpost = function(req, res) {
	console.log('post 모듈 안에 있는 addpost 호출됨.');
 
    var paramTitle = req.body.title || req.query.title;
    var paramContents = req.body.contents || req.query.contents;
	var paramWriter =req.body.writer || req.query.writer;

    //console.log('요청 파라미터 : ' + paramTitle + ', ' + paramContents + ', ' + 
               //paramWriter);
    
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		if(req.isAuthenticated==false){
			return res.redirect('/'); 
		}
		if(paramTitle==null||paramContents==null){
			return res.redirect('/process/listpost?page=0&perPage=8'); 
		}
		// 1. 아이디를 이용해 사용자 검색
		database.UserModel.findByEmail(paramWriter, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                commentWriter=paramWriter;
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
			// var userName=results[0]._doc.writer;
			
			var date=new Date();
			var uniquenumber=date.getTime();
			// save()로 저장
			// PostModel 인스턴스 생성
			var post = new database.PostModel({
				title: paramTitle,
				contents: paramContents,
				writer: userObjectId,
				num: uniquenumber
			});

			post.savePost(function(err, result) {
				if (err) {
                    
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    
                }
			    
			    return res.redirect('/process/showpost/' + post._id); 
			});
			
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var listpost = function(req, res) {
	console.log('post 모듈 안에 있는 listpost 호출됨.');
  
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
		
		database.PostModel.list(options, function(err, results) {
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
				database.PostModel.count().exec(function(err, count) {

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
				
					req.app.render('listpost', context, function(err, html) {
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


var showpost = (req, res) => {
	console.log('post 모듈 안에 있는 showpost 호출됨.');


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
			database.PostModel.load(paramId, function (err, results) {
				if (err) {
					console.log('error');
					console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);

					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
					res.write('<h2>게시판 글 조회 중 에러 발생</h2>');
					res.write('<p>' + err.stack + '</p>');
					res.end();

					return;
				}

				if (results) {

					database.PostModel.incrHits(results._doc._id, function (err2, results2) {
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

					body = context;

					req.app.render('showpost', context, function (err, html) {
						if (err) {
							console.log('context:'+context.posts);
							
							console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack+"//");

							return;
						}
						res.end(html);
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

		res.redirect('/');
	
	}
};

var deletePost = function (req, res) {
    console.log('post.js의 deletepost 호출됨');

    var paramId = req.body.id || req.query.id || req.params.id;

    var database = req.app.get('database');

    if (database.db) {
			database.PostModel.load(paramId, function(err, results) {

            if (err) {
                console.log('삭제할 글 조회 중 오류 발생 ' + err.stack);

                res.writeHead('200', {
                    'Contett-Type': 'text/html;charset =utf8'
                });
                res.write('<h2>삭제할 글 조회 중 오류 발생</h2>')
                res.end();

                return;
			}
			
            if (results) {
                
                results.remove();
    
                res.redirect('/process/listpost?page=0&perPage=8');
            }
        })


    } else {
        res.writeHead('200', {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }


}
		
var updatepost = function(req, res) {
	console.log('post 모듈 안에 있는 updatePost 호출됨.');
    // URL 파라미터로 전달됨
	var paramId = currentId;
	var paramTitle = req.body.title || req.query.title;
    var paramContents = req.body.contents || req.query.contents;
	var database = req.app.get('database');


	//var modifiedContents=paramContents.substring(0,paramContents.length-2);//아예 기호를 뺴는 방법을 생각해봐야하겠음
	// 데이터베이스 객체가 초기화된 경우
	
	// $(document).ready(function(){
	// 	document.getElementById("contents").value=body.posts._doc.contents;
	// 	console.log('HTML');
	// })

if (database.db) {

		database.PostModel.load(paramId, function(err, results) {
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>업데이트 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			if (results) {

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {
					title: '글 조회 ',
					posts: results,
					page: currentPage,
					Entities: Entities
				};
				req.app.render('updatepost', context, function(err, html) {
					res.end(html);
				});
			 
			} 
		});
	}

};

var saveupdatedpost = function(req, res) {
	console.log('----------------------------------------------------post 모듈 안에 있는 updatePost 호출됨.');
    // URL 파라미터로 전달됨
	var paramId = currentId;
	var paramTitle = req.body.title || req.query.title;
    var paramContents = req.body.contents || req.query.contents;
	var database = req.app.get('database');

	if (database.db) {

		database.PostModel.findByIdAndUpdate(paramId,{$set: {title : paramTitle, 
			contents : paramContents, updated_at : Date.now()}}, function(err){
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>업데이트 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			res.redirect('/process/showpost/' + paramId); 
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var addcomment = function(req, res) {
	console.log('post 모듈 안에 있는 addcomment 호출됨.');
 
    var paramId = req.body.id || req.query.id;
    var paramContents = req.body.contents || req.query.contents;
    var paramWriter = req.user.email;
	var Writer = req.user.name;
	var alertWriter=req.body.writerforalert || req.query.writerforalert;
    
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// database.UserModel.load(alertWriter, function(err, results) {
		// 	database.UserModel.findByIdAndUpdate(results._id,{$push: {alert:postUniqueNum}},function(err, results2) {
				
		// 		if (err) {
		// 			console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
		// 			res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		// 			res.write('<h2>에러</h2>');
		// 			res.write('<p>' + err.stack + '</p>');
		// 			res.end();
					
		// 			return;
		// 		}
		// 	});
		
		// });
		// 1. 아이디를 이용해 사용자 검색
		database.PostModel.findByIdAndUpdate(paramId,
            {'$push': {'comments':{'contents':paramContents, 'writer':paramWriter, 'writername':Writer}}},
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


                return res.redirect('/process/showpost/' + paramId); 
        });
 
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var removecomment = function(req, res) {
	console.log('post 모듈 안에 있는 removecomment 호출됨.');
 
    var paramId = currentId;
	var commentId=req.body.delete || req.query.delete;
	var database = req.app.get('database');

		if (database.db) {
			
			database.PostModel.load(paramId, function(err, results) {
				console.log('results(삭제전) :' + results);          
            if (err) {
                console.log('삭제할 글 조회 중 오류 발생 ' + err.stack);

                res.writeHead('200', {
                    'Contett-Type': 'text/html;charset =utf8'
                });
                res.write('<h2>삭제할 글 조회 중 오류 발생</h2>')
                res.end();

                return;
			}
			
            if (results.comments[commentId]) {
                results.comments[commentId].remove();

				database.PostModel.findByIdAndUpdate(paramId,{$set: {title : results.title , contents : results.contents, 
					updated_at : Date.now(), comments:  results.comments, recomments : results.recomments}}, function(err){
					if (err) {
						console.error('업데이트 중 에러 발생 : ' + err.stack);
						
						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>업데이트 에러 발생</h2>');
						res.write('<p>' + err.stack + '</p>');
						res.end();
						
						return;
					}
					res.redirect('/process/showpost/' + paramId);
				});
        
            }
        })

    } else {
        res.writeHead('200', {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
};

var addrecomment = function(req, res) {
	console.log('post 모듈 안에 있는 addrecomment 호출됨.');
 
	var paramId = req.body.id || req.query.id;
	var paramId2 = req.body.id2 || req.query.id2;

    var paramContents = req.body.recomment || req.query.recomment;
    var paramWriter = req.user.email;

	var Contents = req.body.contentsofcomments || req.query.contentsofcomments;
	var Writer = req.user.name;
    
	var database = req.app.get('database');


	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		database.PostModel.findByIdAndUpdate(paramId,
			{'$push': {'recomments':{'contents':paramContents, 'writer':paramWriter,'idcard':paramId2,'writername':Writer}}},
            {'new':true, 'upsert':true}, function(err,results){
			
				if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>업데이트 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			res.redirect('/process/showpost/' + paramId); 
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var removerecomment = function(req, res) {
	console.log('post 모듈 안에 있는 removerecomment 호출됨.');
 
    var paramId = currentId;
	var recommentId=req.body.deleterecomment || req.query.deleterecomment;
	var database = req.app.get('database');

		if (database.db) {
			
			database.PostModel.load(paramId, function(err, results) {
            if (err) {
                console.log('삭제할 글 조회 중 오류 발생 ' + err.stack);

                res.writeHead('200', {
                    'Contett-Type': 'text/html;charset =utf8'
                });
                res.write('<h2>삭제할 글 조회 중 오류 발생</h2>')
                res.end();

                return;
			}
			
            if (results.recomments[recommentId]) {
                results.recomments[recommentId].remove();

				database.PostModel.findByIdAndUpdate(paramId,{$set: {title : results.title , contents : results.contents, 
					updated_at : Date.now(), comments:  results.comments, recomments : results.recomments}}, function(err){
					if (err) {
						console.error('업데이트 중 에러 발생 : ' + err.stack);
						
						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>업데이트 에러 발생</h2>');
						res.write('<p>' + err.stack + '</p>');
						res.end();
						
						return;
					}
					res.redirect('/process/showpost/' + paramId);
				});
				
                   
            }
        });

    } else {
        res.writeHead('200', {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
};

var deleteUser = function(req, res) {
	var paramWriter =req.body.id || req.query.id;
	console.log('deleteuser:');
    
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		
		// 1. 아이디를 이용해 사용자 검색
		database.UserModel.load(paramWriter, function(err, results) {
			if (err) {
                console.error('에러 발생 : ' + err.stack);
                commentWriter=paramWriter;
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>에러 발생</h2>');
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
		
			results.remove();
			//var userObjectId = results[0]._doc._id;
		
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var modifyUser = function(req, res) {
	var paramWriter =req.body.email || req.query.email;
	var writerName =req.body.idmodify || req.query.idmodify;
	
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 아이디를 이용해 사용자 검색
		database.UserModel.load(paramWriter, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			
		
			database.UserModel.findByIdAndUpdate(results._id,{$set: {name:writerName}},  function(err, results2) {
				
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
		res.redirect('/profile');
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};
var scrap = function(req, res) {
	var postId =req.body.postId || req.query.postId;
	var postUniqueNum =req.body.postUniqueNum || req.query.postUniqueNum;;
	var userId;

	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		database.UserModel.load( req.user.email, function(err, results) {
			if (err) {
                console.error('스크랩 중 추가 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			userId=results._id;
		
var tem=postId+","+results.scrapId;
			
			database.UserModel.findByIdAndUpdate(userId,{$set: {scrapId:'1'}},function(err, results2) {
				
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
		res.redirect('/process/showpost/' + postId);
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var showscrap = (req, res) => {

	// URL 파라미터로 전달됨
	var paramId = req.body.id || req.query.id || req.params.id;
	var login = req.isAuthenticated();
	var userEmail=req.user.email;
	var scrapresult=new Array();

	var database = req.app.get('database');
	if(req.isAuthenticated()){
		if (database.db) {

			database.UserModel.load(userEmail, function(err, results){
				if (err) {
					console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
					res.write('<p>' + err.stack + '</p>');
					res.end();
					
					return;
				}
							
				for(var i = 0; i < results.length; i++){
					database.PostModel.load(results.scrapId[i], function (err, results2) {
						if (err) {
							console.log('error');
							console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);
		
							res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
							res.write('<h2>게시판 글 조회 중 에러 발생</h2>');
							res.write('<p>' + err.stack + '</p>');
							res.end();
		
							return;
						}
						
						scrapresult+=results2;
						
					});
				}
			});

			if (results2) {
		
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {
					title: '글 조회 ',
					posts: scrapresult,
					login_success: login,
					user:userEmail,
					Entities: Entities
				};
				req.app.render('userscrap', context, function (err, html) {
					if (err) {
					
						
						console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack+"//");

						return;
					}
					res.end(html);
				});

			} else {
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>글 조회  실패</h2>');
				res.end();
			}
		} else {
			res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
			res.write('<h2>데이터베이스 연결 실패</h2>');
			res.end();
		}
	}else{
		res.redirect('/');
	
	}
};


var searchedlistpost = function(req, res) {
	console.log('post 모듈 안에 있는 searchedlistpost 호출됨.');
  
	var paramPage = req.body.page || req.query.page;
	var search = req.body.search || req.query.search;
	var paramPerPage = 8
	
	// req.body.perPage || req.query.perPage;
	console.log('요청 파라미터(paramPage) ------> ' +paramPage);
	var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
		
		database.PostModel.list(options, function(err, results) {
		

			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 목록 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
			}
			
			
			if (results) {
				//console.dir(results);
			
				// 전체 문서 객체 수 확인
				database.PostModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage,
						searchcontext:search					
					};
					currentPage=context.page;
					body=context;
					//console.log('요청 파라미터(currentPage) ------> ' +currentPage);
					//console.log('요청 파라미터(totalNum) : ' + results);
					req.app.render('searchscreen', context, function(err, html) {
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
var tem = function(req, res) {
	console.log('post 모듈 안에 있는 임시 메서드 실행');
  
	
};
module.exports.listpost = listpost;
module.exports.addpost = addpost;
module.exports.showpost = showpost;
module.exports.addcomment = addcomment;
module.exports.removecomment = removecomment;
module.exports.deletepost = deletePost;
module.exports.updatepost=updatepost;
module.exports.saveupdatedpost=saveupdatedpost;
module.exports.addrecomment= addrecomment;
module.exports.deleteUser= deleteUser;
module.exports.searchedlistpost= searchedlistpost;
module.exports.removerecomment= removerecomment;
module.exports.modifyUser= modifyUser;
module.exports.scrap= scrap;
module.exports.showscrap= showscrap;
module.exports.tem= tem;