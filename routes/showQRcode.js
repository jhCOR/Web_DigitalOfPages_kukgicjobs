var QRCode = require('qrcode');

var loanByQrcode=(req,res)=>{
	var paramId = req.body.id || req.query.id || req.params.id;
	var paramRequest = req.body.request|| req.query.request || req.params.request;
	var user=req.user.email;
	
	var database = req.app.get('database');

	if (database.db) {


	console.log(user);
		database.UserModel.findByEmail(user, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                printer.errrendering(res,err);
                
                return;
			}
			var id;
			if(Array.isArray(results)){
				id=results[0]._id;
			}else{
				id=results._id;
			}
			const data = id+"/"+paramId+'/'+paramRequest; 
			QRCode.toDataURL( data , function(err , url) { //res.send(url);
				var data = url.replace(/.*,/ , ''); 
			
				var img = new Buffer.from(data , 'base64'); 
				res.writeHead(200 , {'Content-Type':'image/png'});
				res.end(img); 
			});
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}
module.exports.loanByQrcode = loanByQrcode;