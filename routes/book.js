var Entities = require('html-entities').AllHtmlEntities;

const ROUTEFUNCTIONPATH="../routeFunc";
var printer = require("../utils/printer");
var saver = require("../utils/saver");

var Borrow = require(ROUTEFUNCTIONPATH+"/borrow");
var AddReview = require(ROUTEFUNCTIONPATH+"/addReview");
var AddBook=require(ROUTEFUNCTIONPATH+"/addBook");
var ListPost=require(ROUTEFUNCTIONPATH+"/listPost");
var RequestBook=require(ROUTEFUNCTIONPATH+"/requestBook");
var ShowBook=require(ROUTEFUNCTIONPATH+"/showBook");

var addbook = (req, res) => {
	console.log('book 모듈 안에 있는 addbook 호출됨.');
	
	AddBook.addBookFun(req, res);
}; 


var listpost = (req, res) => {
	console.log('book 모듈 안에 있는 listpost 호출됨.');
  
    ListPost.listPostFun(req, res);
};


var showbook = (req, res) => {
	console.log('book 모듈 안에 있는 showbook 호출됨.');
	
	ShowBook.showBookFun(req, res);
};

var borrow = function(req, res) {
	console.log('book 모듈 안에 있는 borrow 호출됨.');
	Borrow.borrowFun(req,res);
	
};


var addReview = function(req, res) {
	console.log('book 모듈 안에 있는 addReview 호출됨.');
	AddReview.addReviewFun(req, res);
	
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
                
                printer.errrendering(res,err);
                
                return;
			}

			res.redirect('/book/showbook/' + paramId); 
		});
	
	} else {
		
   		printer.errrendering(res);
	}
	
};

var reservationList = function(req, res) {
	console.log('book 모듈 안에 있는 reservationList 호출됨.');

	var user = req.user.email;
	var database = req.app.get('database');

	if (database.db) {

		database.UserModel.load(user, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res,err);
                
                return;
			}
		
			var context = {
				posts: results,
			};
			
			printer.rendering(req,res,'myPage.ejs',context);			

		});
	} else {
	   printer.errrendering(res);
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
                
                printer.errrendering(res,err);
                
                return;
			}
		});

			database.UserModel.load(user, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res,err);
                
                return;
			}
			
			database.UserModel.findByIdAndUpdate(results._id,{ $pull: { "reservationlist" :  paramId } }

			,  function(err, results2) {
				
			if (err) {
				console.error('에러 발생 : ' + err.stack);
				printer.errrendering(res,err);
				
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

var applyBook = function(req, res) {
	console.log('book 모듈 안에 있는 applyBook 호출됨.');

	var title = req.body.title || req.query.title || req.params.title;
	var author= req.body.author || req.query.author || req.params.author;
	var link= req.body.link || req.query.link || req.params.link;
	var description= req.body.description || req.query.description || req.params.description;

	var context = {
			title: '책 신청',
			bookTitle:title,
			bookAuthor:author,
			bookLink:link,
			bookDescription:description
		};
					
		req.app.render('applyBook.ejs', context, function(err, html) {
			if (err) {
				console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

				printer.errrendering(res,err);

			    return;
			}


			res.end(html);
		});

};

var requestBook = function(req, res) {
	console.log('book 모듈 안에 있는 requestBook 호출됨.');
	RequestBook.requestFun(req,res);
};

var listapplybook = function(req, res) {
	console.log('book 모듈 안에 있는 listapplybook 호출됨.');
  	
    var paramPage = req.body.page || req.query.page||'0';
	var paramPerPage = 8

	var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage,
			criteria:{group:req.user.group},
		}
		
		database.AppplyBookModel.list(options, function(err, results) {
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);              
                printer.errrendering(res,err);
                return;
            }
			
			if (results) {

				database.AppplyBookModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '신청 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage						
					};
					
					printer.rendering(req,res,'listApplyBook',context);
				});
				
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		printer.errrendering(res);
	}
};

var acceptRequest = function(req, res) {
	console.log('book 모듈 안에 있는 acceptRequest 호출됨.');

	var paramId = req.body.id || req.query.id || req.params.id;
	var database = req.app.get('database');

	if (database.db) {
	
		database.AppplyBookModel.findByIdAndUpdate(paramId,{$set: {isAccepted : '1'}}, function(err,re){
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
               	printer.errrendering(res,err);
                return;
			}

		});
		
		res.redirect("/book/listapplybook?page=0&perPage=2"); 
	} else {
		printer.errrendering(res);
	}
	
};


var search = (req, res)=> {
	console.log('book 모듈 안에 있는 search 호출됨.');
	const paramPage = req.body.page || req.query.page||'0';
	const search = req.body.search || req.query.search;
	const paramPerPage = 8

	let page="";
	if(req.body.search ){
		var option={group:req.user.group,
					 title: new RegExp(search) }
		page="listbook";
	}else{
		var option={ title: new RegExp(search) }
		page="listbook_All";
	}
	
	const database = req.app.get('database');

	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage,
			criteria:option,
			
		}
		
		database.BookModel.searchList(options, (err, results)=> {
			
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
                printer.errrendering(res,err);
                
                return;
            }
			
			if (results) {
					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 검색',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(results.length / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: results.length ,
						size: paramPerPage,
						searchcontext:search,
					};

					printer.rendering(req,res,page,context);
			}
		});
	}
};

var requestlist = function(req, res) {
	console.log('book 모듈 안에 있는 requestlist 호출됨.');
  	
    var paramPage = req.body.page || req.query.page||'0';
	var paramPerPage = 8

	var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage,
			criteria:{admin:'adminRequset'},
		}
		
		database.UserModel.list(options, function(err, results) {
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
               printer.errrendering(res,err);
                return;
            }
			
			if (results) {
				console.log(results);
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '권한 요청',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(results.length / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: results.length,
						size: paramPerPage						
					};



				printer.rendering(req,res,'listAdminRequest',context);
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		printer.errrendering(res);
	}
};

var acceptAdminRequest = function(req, res) {
	console.log('book 모듈 안에 있는 acceptAdminRequest 호출됨.');

	var paramId = req.body.id || req.query.id || req.params.id;
	var database = req.app.get('database');

	if (database.db) {
		database.UserModel.findByIdAndUpdate(paramId,{$set: {admin : 'accepted'}}, function(err,re){
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                printer.errrendering(res,err);
                
                return;
			}
		});
		
		res.redirect("/user/requestlist?page=0&perPage=2"); 
	} else {
		printer.errrendering(res);
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
module.exports.applyBook = applyBook;
module.exports.requestBook = requestBook;
module.exports.listapplybook = listapplybook;
module.exports.acceptRequest = acceptRequest;
module.exports.search = search;
module.exports.requestlist = requestlist;
module.exports.acceptAdminRequest = acceptAdminRequest;

