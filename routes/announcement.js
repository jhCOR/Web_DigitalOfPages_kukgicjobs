var saver = require("../utils/saver");
var printer = require("../utils/printer");
var addAnnounceFun=(req, res)=>{
	const paramContents = req.body.contents || req.query.contents;
	const paramTitle = req.body.title || req.query.title;
    const paramWriter =req.user.email;
	console.log('addAnnounceFun실행중');
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		if(req.isAuthenticated==false){
			return res.redirect('/'); 
		}
		if(paramTitle==null||paramContents==null){
			return res.redirect('/dev/announcement?page=0&perPage=8'); 
		}
		
			var announcement = new database.AnnouncementModel({
				title: paramTitle,
				contents: paramContents,
				writer : paramWriter,
				group:req.user.group,
			});
			
			saver.saving(announcement,res,'/announce/show/' + announcement._id);
            
		
	} else {
		printer.errrendering(res);
	} 
}


module.exports.addAnnounceFun = addAnnounceFun;
