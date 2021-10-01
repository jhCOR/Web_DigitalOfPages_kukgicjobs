var printer = require("./printer");

var saving = (Model,res,link) => {
	Model.savePost(function(err, result) {
		if(err) {
            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);
            printer.rendering(res,err);
            return;
        }
		if(link){
			return res.redirect(link); 
		}
		
	
	});
}

module.exports.saving = saving;