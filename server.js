import express from 'express';
import path from 'path';
import { bookRouter } from './route';
const PORT = process.env.PORT || 3001;

const app = express();

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