var errrendering=(res,err)=>{
	if(err){
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
	}else{
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}

var rendering=(req,res,file,context)=>{
	req.app.render(file, context, function(err, html) {
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
}
module.exports.rendering = rendering;
module.exports.errrendering = errrendering;
