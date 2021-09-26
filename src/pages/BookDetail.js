import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// import { BlogPostCard, BlogPostsSort, BooksSearch, } from '../components/_dashboard/blog';
import DetailContainer from '../components/_dashboard/detail/DetailContainer';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

export default function BookDetail() {
	const { id } = useParams();
	const bookInfo = POSTS.filter(book => book.id === id);
	
	return (
		<Page title="Dashboard: Library">
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					<Typography variant="h4" gutterBottom>
						Details
					</Typography>
					<Button
						variant="contained"
						component={RouterLink}
						to="#"
						startIcon={<Icon icon={plusFill} />}
					>
						대출 신청
					</Button>
				</Stack>

				<DetailContainer book={bookInfo[0]} ></DetailContainer>
			</Container>
		</Page>
	);
}