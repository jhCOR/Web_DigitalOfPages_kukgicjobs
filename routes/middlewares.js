exports.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        res.send({email:req.user.email});
        next();
    }else{
        res.status(403).send('로그인이 필요합니다.');

    }
};