module.exports = {

	server_port: 3000,
	db_url: 'mongodb://growbigger:growbigger1117@localhost:27017/admin',
	db_schemas: [
        {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'}
        ,{file:'./post_schema', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
	],
	route_info: [
        {file:'./post', path:'/process/addpost', method:'addpost', type:'post'}
        ,{file:'./post', path:'/process/showpost/:id', method:'showpost', type:'get'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'post'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'get'}
		,{file:'./post', path:'/process/addcomment', method:'addcomment', type:'post'}
		, {file:'./post', path:'/process/deletepost', method:'deletepost', type: 'post'}
		,{file:'./post', path:'/process/updatepost', method:'updatepost', type:'post'}
		,{file:'./post', path:'/process/saveupdatedpost', method:'saveupdatedpost', type:'post'}
		,{file:'./post', path:'/process/removecomment', method:'removecomment', type:'post'}
		,{file:'./post', path:'/process/addrecomment', method:'addrecomment', type:'post'}
		,{file:'./post', path:'/process/deleteUser', method:'deleteUser', type:'post'}
		,{file:'./post', path:'/process/searchedlistpost', method:'searchedlistpost', type:'post'}
		,{file:'./post', path:'/process/searchedlistpost', method:'searchedlistpost', type:'get'}
		,{file:'./post', path:'/process/removerecomment', method:'removerecomment', type:'post'}
		,{file:'./post', path:'/process/modifyUser', method:'modifyUser', type:'post'}
		,{file:'./post', path:'/process/scrap', method:'scrap', type:'post'}
		,{file:'./post', path:'/process/showscrap', method:'showscrap', type:'post'}
		
		
	],
	facebook: {		// passport facebook
		clientID: '1442860336022433',
		clientSecret: '13a40d84eb35f9f071b8f09de10ee734',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	}
}