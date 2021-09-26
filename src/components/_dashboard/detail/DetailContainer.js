import PropTypes from 'prop-types';
// material
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

// const DetailBox = styled(Container)({
// 	display: 'flex',
// });

const BookInfo = styled(Typography)(({ theme }) => ({
	flexGrow: '0',
	maxWidth: '66.666667%',
	flexBasis: '66.666667%',
	padding: '0 15px !important',
	[theme.breakpoints.down('sm')]: {
		maxWidth: '100%',
		flexBasis: '100%',
	},
}));

const CardMediaStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	boxSizing: 'border-box',
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
	flexGrow: '0',
	maxWidth: '33.333333%',
	flexBasis: '33.333333%',
	padding: '0 15px !important',
	borderRadius: '10%',
	[theme.breakpoints.down('sm')]: {
		maxWidth: '100%',
		flexBasis: '100%',
	},
}));

// ----------------------------------------------------------------------

DetailContainer.propTypes = {
	book: PropTypes.object.isRequired,
};

export default function DetailContainer({ book }) {
	const latestPostLarge = true;
	console.log(book);

	return (
		<Container>
			<CardMediaStyle>
				<CoverImgStyle alt={book.title} src={book.cover} />
				<BookInfo variant="h3" gutterBottom>
					{book.title}
					<br />
					<Typography variant='subtitle2' sx={{ pt: '13px',color: 'text.disabled', display: 'block' }}>
						{book.genres}
					</Typography>
				</BookInfo>
			</CardMediaStyle>
		</Container>
	);
}