import PropTypes from 'prop-types';
// material
import { Paper, Typography, Container } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const DetailBox = styled(Container)({
	display: 'flex',
});

const BookInfo = styled(Typography)({
	position: 'absolute',
	right: '5%',
});

const CardMediaStyle = styled('div')({
	top: 0,
	width: 'calc(100% * 2 / 4)',
	position: 'relative',
	paddingTop: 'calc(100% * 3 / 4)',
});

const CoverImgStyle = styled('img')({
	top: 0,
	width: '100%',
	objectFit: 'cover',
	position: 'absolute',
});

// ----------------------------------------------------------------------

DetailContainer.propTypes = {
	book: PropTypes.object.isRequired,
};

export default function DetailContainer({ book }) {
	const latestPostLarge = true;
	console.log(book);

	return (
		<Container>
			<BookInfo variant="h4" gutterBottom>
						{book.title}<br />{book.genres}
					</BookInfo>
			<CardMediaStyle
				sx={{
					...(latestPostLarge && {
						pt: 'calc(100% * 4 / 3)',
					}),
				}}
			>
				<CoverImgStyle alt={book.title} src={book.cover} />
			</CardMediaStyle>
		</Container>
	);
}

// <Paper>
// 			<Typography gutterBottom align="center" variant="subtitle1">
// 				Details
// 			</Typography>
// 			<Typography variant="body2" align="center">
// 				No results found for &nbsp;
// 				<strong>&quot;{book.title}&quot;</strong>. Try checking for typos or using complete
// 				words.
// 			</Typography>
// 		</Paper>