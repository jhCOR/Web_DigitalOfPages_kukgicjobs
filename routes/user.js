var printer = require("../utils/printer");
var saver = require("../utils/saver");

const ROUTEFUNCTIONPATH="../routeFunc";

var ModifyUser = require(ROUTEFUNCTIONPATH+"/modifyUser");

var deleteUser = function(req, res) {
console.log('user 모듈 안에 있는 deleteUser 호출됨.');
	var paramWriter =req.user.email;
	console.log('deleteuser:'+paramWriter);
    
	var database = req.app.get('database');
	var options={
		email:paramWriter,
	};
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		
		// 1. 아이디를 이용해 사용자 검색
		database.UserModel.load2(options, function(err, results) {
			if (err) {
                printer.errrendering(res,err);
                return;
            }
			if (results == undefined || results.length < 1) {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 [' + paramWriter + ']를 찾을 수 없습니다.</h2>');
				res.end();
				
				return;
			}
		
			results.remove();
			res.redirect('/logout');
		});
		
	} else {
 		printer.errrendering(res);
	}
};

var modifyUser = function(req, res) {
	ModifyUser.modifyFunc(req,res);
	 console.log('req.auth=>', req.isAuthenticated());
};

var acceptAdminRequest = function(req, res) {
	console.log('user 모듈 안에 있는 acceptAdminRequest 호출됨.');

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
module.exports.deleteUser = deleteUser;
module.exports.modifyUser = modifyUser;
module.exports.acceptAdminRequest = acceptAdminRequest;