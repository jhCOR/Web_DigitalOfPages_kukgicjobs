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

var deleteAnnounceFun = function (req, res) {
    var paramId = req.body.id || req.query.id || req.params.id;
    var database = req.app.get('database');

    if (database.db) {
			database.AnnouncementModel.load(paramId, function(err, results) {

            if (err) {
                res.writeHead('200', {
                    'Contett-Type': 'text/html;charset =utf8'
                });
                res.write('<h2>삭제할 글 조회 중 오류 발생</h2>')
                res.end();

                return;
			}
			
            if (results) {
                
                results.remove();
                res.redirect('/dev/announcement?page=0&perPage=8');
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
module.exports.addAnnounceFun = addAnnounceFun;
module.exports.deleteAnnounceFun = deleteAnnounceFun;

