"use strict";
import express from 'express';
import { addBook, applyBook, showBookList } from '../controllers/book';

const router = express.Router();

router.get('/addBook', addBook);
router.post('/applyBook', applyBook);
router.get('/bookList', showBookList);
router.get('/test', (req, res) => {
	res.send('BookRouter works');
});

// export { router as bookRouter }
module.exports =  router;