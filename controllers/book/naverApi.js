import { BookModel, UserModel, ApplyBookModel } from '../../models';
import { saver, printer } from '../../utils';
import request from 'request';

const client_id = process.env.ID || '89GJe6xA9xtO2UH7949D';
const client_secret = process.env.PW || '5cWawTQePf';

export default function naverApi(req, res) {
	const api_url =
		'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(req.body.booktitle);
	
	const options = {
		url: api_url,
		headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
	};
	request.get(options, (error, response, body) => {
		console.log(body);
		if (!error && response.statusCode == 200) {
			const jsonData = JSON.parse(response.body);
			//console.log(jsonData.items);

			const context = {
				title: '책 목록',
				posts: jsonData.items,
				next: '책 검색',
			};
			//console.log(jsonData.items);
			res.json({ bookData: jsonData.items, });
		} else {
			res.status(response.statusCode).end();
			console.log('error = ' + response.statusCode);
		}
	});
}