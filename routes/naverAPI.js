var client_id = process.env.ID;
var client_secret = process.env.PW;

module.exports = function(router, passport) {

    // 홈 화면
    router.route('/searchBooks').post(function (req, res) {

   var api_url = 'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(req.body.booktitle);  
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
		 
		var jsonData=JSON.parse(response.body);
		 var nextLink;
	
		var context = {
			title: '책 목록',
			posts: jsonData.items,
			next:req.body.next,
		};			
		 
		req.app.render('selectBook.ejs', context, function(err, html) {
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
	
     } else {
		 
       res.status(response.statusCode).end();
		 
     }
   });
 });
 router.route('/vue/searchBooks').post(function (req, res) {

   var api_url = 'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(req.body.booktitle);  
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
		 
		var jsonData=JSON.parse(response.body);
		 var nextLink;

		res.send( jsonData.items);
     } else {
		 
       res.status(response.statusCode).end();
		 
     }
   });
 });

};