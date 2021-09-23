import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, TextField, InputAdornment, OutlinedInput } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
	width: 240,
	transition: theme.transitions.create(['box-shadow', 'width'], {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.shorter,
	}),
	'&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
	'& fieldset': {
		borderWidth: `1px !important`,
		borderColor: `${theme.palette.grey[500_32]} !important`,
	},
}));
// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
	// posts: PropTypes.array.isRequired,
};

export default function BlogPostsSearch(/*{ posts }*/) {
	const [formInput, setFormInput] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(`formInput ::: ${formInput}`);
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

	return (
		<RootStyle>
			<form onSubmit={handleSubmit}>
				<SearchStyle
					value={formInput}
					onChange={handleInput}
					placeholder="Search books..."
					startAdornment={
						<InputAdornment position="start">
							<Box
								component={Icon}
								icon={searchFill}
								sx={{ color: 'text.disabled' }}
							/>
						</InputAdornment>
					}
				/>
			</form>
		</RootStyle>
	);
}