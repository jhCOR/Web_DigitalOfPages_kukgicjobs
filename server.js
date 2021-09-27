import express from 'express';
import path from 'path';
import { bookRouter } from './route';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json())
// CORS 헤더를 서버에 추가하여 서버 응답에 대한 액세스 권한을 부여
app.use(cors({
    origin: 'https://osam-hackathon-client.run.goorm.io'
}));

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../my-app/build')));

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from Server!' });
});

app.use('/api/book', bookRouter);

//--------------------------현재 테스팅 중이므로 주석처리(배포 시 활성화)
// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../my-app/build', 'index.html'));
// });

app.listen(PORT, () => {
	console.log(`Server listening at https://osam-hackton--server.run.goorm.io/`);
});