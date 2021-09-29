"use strict";
import express from 'express';
import { addBook, applyBook, showBookList, naverApi } from '../controllers/book';

const router = express.Router();

router.get('/addBook', addBook);
router.post('/applyBook', applyBook);
router.get('/bookList', showBookList);
router.post('/searchBooks', naverApi);
router.get('/test', (req, res) => {
	res.json({ message: 'Connected with Server' });
});

// export { router as bookRouter }
module.exports =  router;