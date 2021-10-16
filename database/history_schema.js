var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var PostSchema = mongoose.Schema({
	    title: {type: String, trim: true, 'default':''},		// 글 제목
	    contents: {type: String, trim:true, 'default':''},		
		group: {type: String, index: 'hashed', 'default':''},//소속 부대				
	    writer: {type: mongoose.Schema.ObjectId, ref: 'user7'},	// 글쓴 사람
        bookinfo: {type: String, trim:true, 'default':''},
		range: {type: String, trim:true, 'default':'비공개'},
		writeremail:{type: String, trim: true, 'default':''},
		hits: {type: Number, 'default': 0},   // 조회수
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
	PostSchema.path('title').required(true, '글 제목을 입력하셔야 합니다.');
	PostSchema.path('contents').required(true, '글 내용을 입력하셔야 합니다.');
	// 스키마에 인스턴스 메소드 추가
	PostSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
	}
	
	PostSchema.statics = {
		// ID로 글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('writer', 'name provider email')
				.exec(callback);
		},
		
		load2: function(number, callback) {
			this.findOne({num: number})
				.populate('writer', 'name provider email')
				.exec(callback);
		},
		
		searchList: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
			.populate('writer', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},
		
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
			.populate('writer', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},
		
        incrHits: function(id, callback) {
            var query = {_id: id};
            var update = {$inc: {hits:1}};
            var options = {upsert:true, 'new':true, setDefaultsOnInsert:true};
            
            this.findOneAndUpdate(query, update, options, callback);            
        }
	}
	
	console.log('PostSchema 정의함.');

	return PostSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;

