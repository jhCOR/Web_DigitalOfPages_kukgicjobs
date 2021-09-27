const ROUTEFUNCTIONPATH="../routeFunc";
var printer = require("../utils/printer");
var saver = require("../utils/saver");
var RequestBook = require(ROUTEFUNCTIONPATH + '/requestBook');
var applyBook = function(req, res) {
	console.log('BookRequest 모듈 안에 있는 applyBook 호출됨.');

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
	console.log('BookRequest 모듈 안에 있는 requestBook 호출됨.');
	RequestBook.requestFun(req,res);
};


var acceptRequest = function(req, res) {
	console.log('BookRequest 모듈 안에 있는 acceptRequest 호출됨.');

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
module.exports.applyBook = applyBook;
module.exports.requestBook = requestBook;
module.exports.acceptRequest = acceptRequest;