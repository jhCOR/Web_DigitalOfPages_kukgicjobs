import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
//
import POSTS from '../../../_mocks_/blog';

BookList.propTypes = {
	formInput: PropTypes.string.isRequired,
};

export default function BookList({ formInput }) {
	// 검색 결과 반환
	const match = POSTS.filter((book, index) => {
		return book.title.match(formInput);
	});

	return (
		<>
			{match.map((book, index) => (
				<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
					<ListItem
						alignItems="flex-start"
						component={RouterLink}
						to={`/dashboard/detail/${book.id}`}
					>
						<ListItemAvatar>
							<Avatar alt="book cover" src={book.cover} />
						</ListItemAvatar>
						<ListItemText
							primary={book.title}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										{book.score}
									</Typography>
									{" — "}{book.genres}
								</React.Fragment>
							}
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
				</List>
			))}
		</>
	);
}