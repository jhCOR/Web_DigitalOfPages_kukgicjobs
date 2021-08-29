module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/admin',
	db_schemas: [
        {file:'./user_schema', collection:'user7', schemaName:'UserSchema', modelName:'UserModel'}
		,{file:'./book_schema', collection:'book', schemaName:'BookSchema', modelName:'BookModel'}
		,{file:'./reservation_schema', collection:'reservation', schemaName:'ReservationSchema', modelName:'ReservationModel'}
	],
	route_info: [

		{file:'./book', path:'/book/listpost', method:'listpost', type:'get'}
		,{file:'./book', path:'/book/addbook', method:'addbook', type:'post'}
		,{file:'./book', path:'/book/showbook/:id', method:'showbook', type:'get'}
		,{file:'./book', path:'/book/lend', method:'borrow', type:'post'}
		,{file:'./book', path:'/book/reservation', method:'reservation', type:'post'}
		,{file:'./book', path:'/book/addreview', method:'addReview', type:'post'}
		,{file:'./book', path:'/views/myPage.ejs', method:'reservationList', type:'get'}
		,{file:'./book', path:'/book/return/:id', method:'giveBack', type:'get'}
	],

}
