var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var AppplyBookSchema = mongoose.Schema({
	    title: {type: String, trim: true, 'default':''},		// 글 제목
	    contents: {type: String, trim:true, 'default':''},		
		group: {type: String, index: 'hashed', 'default':''},//소속 부대
		author: {type: String, trim:true, 'default':''},	
		isAccepted: {type: String, trim:true, 'default':'0'},
		isArrive: {type: String, trim:true, 'default':'0'},
	    user: {type: mongoose.Schema.ObjectId, ref: 'user7'},	///사용자
		
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
	AppplyBookSchema.path('title').required(true, '글 제목을 입력하셔야 합니다.');
	AppplyBookSchema.path('contents').required(true, '글 내용을 입력하셔야 합니다.');
	AppplyBookSchema.path('author').required(true, '저자를 입력하셔야 합니다.');
	// 스키마에 인스턴스 메소드 추가
	AppplyBookSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
	}
	
	AppplyBookSchema.statics = {
		// ID로 글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('writer', 'name email')
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.populate('user', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},
	}
	
	console.log('AppplyBookSchema 정의함.');

	return AppplyBookSchema;
};

module.exports = SchemaObj;

