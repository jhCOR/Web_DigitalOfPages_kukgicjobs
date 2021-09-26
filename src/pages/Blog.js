import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BooksSearch, BookList } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Blog() {
	const [formInput, setFormInput] = useState('');

	const handleSubmit = (event) => {
		// console.log(`formInput ::: ${formInput}`);
		
		// backend 연결 시 작성 예정
		// fetch('to backend api', {
		// 	method: 'POST',
		// 	body: data,
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((response) => console.log('Success:', JSON.stringify(response)))
		// 	.catch((error) => console.error('Error:', error));
	};

	const handleInput = (event) => {
		setFormInput(event.target.value);
	};

	useEffect(() => {
		return formInput.length > 0 ? handleSubmit(formInput) : null;
	}, [formInput]);

	return (
		<Page title="Dashboard: Library">
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					<Typography variant="h4" gutterBottom>
						Books
					</Typography>
					<Button
						variant="contained"
						component={RouterLink}
						to="#"
						startIcon={<Icon icon={plusFill} />}
					>
						도서 신청
					</Button>
				</Stack>

				<Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
					<BooksSearch formInput={formInput} onFormInput={handleInput} />
					<BlogPostsSort options={SORT_OPTIONS} />
				</Stack>

				{formInput.length > 0 ? (
					<BookList formInput={formInput}/>
				) : (
					<Grid container spacing={3}>
						{POSTS.map((post, index) => (
							<BlogPostCard key={post.id} post={post} index={index} />
						))}
					</Grid>
				)}
			</Container>
		</Page>
	);
}