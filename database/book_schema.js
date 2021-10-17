
/**
 * 게시판을 위한 데이터베이스 스키마를 정의하는 모듈
 */

var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var BookSchema = mongoose.Schema({
	    title: {type: String, trim: true, 'default':''},		// 글 제목
	    contents: {type: String, trim:true, 'default':''},		
		which: {type: String, trim:true, 'default':''},		// 등록자
		group: {type: String, index: 'hashed', 'default':''},//소속 부대
		reservation: {type: String, trim:true, 'default':''},		
		author: {type: String, trim:true, 'default':''},				
	    writer: {type: mongoose.Schema.ObjectId, ref: 'user7'},
		borrowUser: {type: mongoose.Schema.ObjectId, ref: 'user7'},// 글쓴 사람
		isbn:{type: String, trim:true, 'default':''},
		img:{type: String, trim:true, 'default':''},
		classification:{type: String, trim:true, 'default':'지정되지 않음'},
		review: [{		// 리뷰
		contents: {type: String, trim:true, 'default': ''},				// 댓글 내용
			writer: {type: String, trim:true, 'default': ''},
			writername: {type: String, trim:true, 'default': ''},
			created_at: {type: Date, 'default': Date.now},
		}],
		reviewID: {type: mongoose.Schema.ObjectId, ref: 'review'},
		num: {type: String, trim: true, 'default':'0'},//대출(1)비대출(0)예약(2)	    tags: {type: [], 'default': ''},
        hits: {type: Number, 'default': 0},   // 조회수
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
	BookSchema.path('title').required(true, '글 제목을 입력하셔야 합니다.');
	BookSchema.path('contents').required(true, '글 내용을 입력하셔야 합니다.');
	BookSchema.path('author').required(true, '저자를 입력하셔야 합니다.');
	// 스키마에 인스턴스 메소드 추가
	BookSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
		addComment: function(user, comment, callback) {		// 댓글 추가
			this.comment.push({
				contents: comment.contents,
				writer: user._id
			});
			
			this.save(callback);
		},
		removeComment: function(id, callback) {		// 댓글 삭제
			var index = utils.indexOf(this.comments, {id: id});
			if (~index) {
				this.comments.splice(index, 1);
			} else {
				return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
			}
			
			this.save(callback);
		}
	}
	
	BookSchema.statics = {
		// ID로 글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('writer', 'name provider email profile_path')
				.populate('reviewID', 'group isbn review')
				.populate('borrowUser', 'name group provider email')
				.exec(callback);
		},
		load3: function(id, callback) {
			this.findOne({_id: id})
				.populate('writer', 'name provider email')
				.populate('reviewID', 'group isbn review')
				.exec(callback);
		},
		load2: function(number, callback) {
			this.findOne({num: number})
				.populate('writer', 'name provider email')
				.exec(callback);
		},
		load4:function (options, callback) {
			
		options.select = options.select ;
		this.find(options.criteria)
			.populate('writer', 'name provider email')
			.select(options.select)
			.exec(callback);
		},
		searchList: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
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
	
	console.log('BookSchema 정의함.');

	return BookSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;

