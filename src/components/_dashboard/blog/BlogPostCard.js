import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
// import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import starOutline from '@iconify/icons-eva/star-outline';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
	position: 'relative',
	paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
	height: 44,
	overflow: 'hidden',
	WebkitLineClamp: 2,
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
	zIndex: 9,
	width: 32,
	height: 32,
	position: 'absolute',
	left: theme.spacing(3),
	bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-end',
	marginTop: theme.spacing(3),
	color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
	post: PropTypes.object.isRequired,
	index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
	const { id, cover, title, view, comment, author, genres, score } = post;

	const POST_INFO = [
		{ number: comment, icon: messageCircleFill },
		{ number: view, icon: eyeFill },
		{ number: score, icon: starOutline },
	];

	return (
		<Grid item xs={12} sm={6} md={3}>
			<Card sx={{ position: 'relative' }}>
				<CardMediaStyle>
					<SvgIconStyle
						color="paper"
						src="/static/icons/shape-avatar.svg"
						sx={{
							width: 80,
							height: 36,
							zIndex: 9,
							bottom: -15,
							position: 'absolute',
						}}
					/>
					<AvatarStyle
						alt={author.name}
						src={author.avatarUrl}
					/>

					<CoverImgStyle alt={title} src={cover} />
				</CardMediaStyle>

				<CardContent
					sx={{
						pt: 4,
					}}
				>
					<Typography
						gutterBottom
						variant="caption"
						sx={{ color: 'text.disabled', display: 'block' }}
					>
						{genres}
					</Typography>

					<TitleStyle
						color="inherit"
						variant="subtitle2"
						underline="hover"
						component={RouterLink}
						to={`/dashboard/detail/${id}`}
					>
						{title}
					</TitleStyle>

					<InfoStyle>
						{POST_INFO.map((info, index) => (
							<Box
								key={index}
								sx={{
									display: 'flex',
									alignItems: 'center',
									ml: index === 0 ? 0 : 1.5,
								}}
							>
								<Box
									component={Icon}
									icon={info.icon}
									sx={{ width: 16, height: 16, mr: 0.5 }}
								/>
								<Typography variant="caption">
									{fShortenNumber(info.number)}
								</Typography>
							</Box>
						))}
					</InfoStyle>
				</CardContent>
			</Card>
		</Grid>
	);
}