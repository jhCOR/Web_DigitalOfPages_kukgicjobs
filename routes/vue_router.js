var movie = (req, res) => {
    console.log('movie 호출됨.');
	var text= '{"name": "식빵", "family": "웰시코기", "age": 1, "weight": 2.14}';
var text2=	'{ "id": 1, "name": "기생충", "rate": "54.80%", "director": "봉준호", "actors": "송강호(기택), 이선균(박사장), 조여정(연교) 등", "time": "131분", "synopsis": "<strong>폐 끼치고 싶진 않았어요</strong><br>전원백수로 살 길 막막하지만 사이는 좋은 기택(송강호) 가족. <br>장남 기우(최우식)에게 명문대생 친구가 연결시켜 준 고액 과외 자리는 <br>모처럼 싹튼 고정수입의 희망이다. <br>온 가족의 도움과 기대 속에 박사장(이선균) 집으로 향하는 기우. <br>글로벌 IT기업 CEO인 박사장의 저택에 도착하자 <br>젊고 아름다운 사모님 연교(조여정)가 기우를 맞이한다.","poster": "https://movie-phinf.pstatic.net/20190528_36/1559024198386YVTEw_JPEG/movie_image.jpg?type=f125" }'
	var param=JSON.parse(text);
	console.log(typeof(param));
   res.send(text2);
}
module.exports.movie = movie;