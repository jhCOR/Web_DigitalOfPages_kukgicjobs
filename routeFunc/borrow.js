var saver = require("../utils/saver");
var printer = require("../utils/printer");
var borrowFun=(req, res)=>{
	var paramId = req.body.id || req.query.id || req.params.id;
	var user=req.user.email;
	var database = req.app.get('database');
	
	if (database.db) {
		var reservation = new database.ReservationModel({
			bookInfo:paramId,
			user:user,
		});
		saver.saving(reservation);
		

		database.UserModel.findOne({email:user}, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res,err);
                
                return;
			}
			
			database.BookModel.findByIdAndUpdate(paramId,{$set: {num : '1', updated_at : Date.now(), borrowUser : results._id }}, function(err,re){
			if (err) {
                console.error('업데이트 중 에러 발생 : ' + err.stack);
                
                printer.errrendering(res,err);
                
                return;
			}
		
					database.UserModel.findByIdAndUpdate(results._id,	{'$push': {'reservationlist':paramId}},
			{'new':true, 'upsert':true},  function(err, results2) {
			console.log("Afterborrow:"+results2);
			if (err) {
				console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
				printer.errrendering(res,err);
				
				return;
			}
			res.redirect('/book/showbook/' + paramId); 
			});
			
		});
			
		
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}
module.exports.borrowFun = borrowFun;