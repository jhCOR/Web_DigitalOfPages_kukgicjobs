module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/admin',
	db_schemas: [
        {file:'./user_schema', collection:'user7', schemaName:'UserSchema', modelName:'UserModel'}
		,{file:'./user_schema_admin', collection:'adminuser', schemaName:'AdminUserSchema', modelName:'AdminUserModel'}
		,{file:'./book_schema', collection:'book', schemaName:'BookSchema', modelName:'BookModel'}
		,{file:'./reservation_schema', collection:'reservation', schemaName:'ReservationSchema', modelName:'ReservationModel'}
		,{file:'./applybook_schema', collection:'AppplyBook', schemaName:'AppplyBookSchema', modelName:'AppplyBookModel'}
		,{file:'./history_schema', collection:'bookpost', schemaName:'BookPostSchema', modelName:'BookPostModel'}
	],
	route_info: [

		{file:'./showList', path:'/book/listpost', method:'listpost', type:'get'}
		,{file:'./showList', path:'/views/myPage.ejs', method:'reservationList', type:'get'}
		,{file:'./showList', path:'/book/listapplybook', method:'listapplybook', type:'get'}
		,{file:'./showList', path:'/user/requestlist', method:'requestlist', type:'get'}
		
		,{file:'./book', path:'/book/addbook', method:'addbook', type:'post'}
		,{file:'./book', path:'/book/showbook/:id', method:'showbook', type:'get'}
		,{file:'./book', path:'/book/lend', method:'borrow', type:'post'}
		,{file:'./book', path:'/book/reservation', method:'reservation', type:'post'}
		,{file:'./book', path:'/book/addreview', method:'addReview', type:'post'}
		,{file:'./book', path:'/book/return/:id', method:'giveBack', type:'get'}
		,{file:'./book', path:'/book/search', method:'search', type:'post'}
		,{file:'./book', path:'/book/search', method:'search', type:'get'}
		,{file:'./book', path:'/searchGroup', method:'searchGroup', type:'get'}
		
		,{file:'./BookRequest', path:'/book/applyBook', method:'applyBook', type:'post'}
		,{file:'./BookRequest', path:'/requestBook', method:'requestBook', type:'post'}
		,{file:'./BookRequest', path:'/book/acceptRequest/:id', method:'acceptRequest', type:'get'}
		
		,{file:'./user', path:'/user/modifyUser', method:'modifyUser', type:'post'}
		,{file:'./user', path:'/userRequest/deleteUser', method:'deleteUser', type:'post'}
		,{file:'./user', path:'/user/acceptAdminRequest/:id', method:'acceptAdminRequest', type:'get'}
		,{file:'./showQRcode', path:'/book/loanByQrcode/:id', method:'loanByQrcode', type:'get'}
		
		,{file:'./HistoryOfBook', path:'/post/addHistoryOfBook', method:'addHistoryOfBook', type:'post'}
		,{file:'./HistoryOfBook', path:'/post/addHistoryOfBook/:id', method:'addHistoryOfBook', type:'get'}
		,{file:'./HistoryOfBook', path:'/historyofbook', method:'listHistoryOfBook', type:'get'}
	],
};
