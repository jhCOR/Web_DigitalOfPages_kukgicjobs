var saver = require("../utils/saver");
var printer = require("../utils/printer");

var modifyFunc = (req, res)=>{
	var paramWriter =req.user.email || req.user.email;
	var writerName =req.body.idmodify || req.query.idmodify;
	
	var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 아이디를 이용해 사용자 검색
	
			
			database.UserModel.findByIdAndUpdate(req.user._id,{$set: {name:writerName}},  function(err, theresult) {
			
				if (err) {
					  printer.errrendering(res,err);
					return;
				}
				

		req.session.passport.user.name = writerName;
        req.session.save(function() {
            res.redirect('/profile');
        });
			});
	

		
	} else {
		printer.errrendering(res);
	}
}
module.exports.modifyFunc = modifyFunc;