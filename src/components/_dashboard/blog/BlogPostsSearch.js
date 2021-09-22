import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, TextField, /*Autocomplete,*/ InputAdornment } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	'& .MuiAutocomplete-root': {
		width: 200,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.shorter,
		}),
		'&.Mui-focused': {
			width: 240,
			'& .MuiAutocomplete-inputRoot': {
				boxShadow: theme.customShadows.z12,
			},
		},
	},
	'& .MuiAutocomplete-inputRoot': {
		'& fieldset': {
			borderWidth: `1px !important`,
			borderColor: `${theme.palette.grey[500_32]} !important`,
		},
	},
	'& .MuiAutocomplete-option': {
		'&:not(:last-child)': {
			borderBottom: `solid 1px ${theme.palette.divider}`,
		},
	},
}));

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default function BlogPostsSearch({ posts }) {
	// const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
	// 	searchValue: '',
	// 	searchKey: ''
	// });

	const [formInput, setFormInput] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		let data = formInput;
		console.log(`formInput ::: ${data}`);
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
		const formInput = event.target.value;
		setFormInput(formInput);
	};

	return (
		<RootStyle>
			<form onSubmit={handleSubmit}>
				<TextField
					placeholder="Search book..."
					InputProps={{
						startAdornment: (
							<>
								<InputAdornment position="start">
									<Box
										component={Icon}
										icon={searchFill}
										sx={{
											ml: 1,
											width: 20,
											height: 20,
											color: 'text.disabled',
										}}
									/>
								</InputAdornment>
							</>
						),
					}}
					onChange={handleInput}
				/>
			</form>
		</RootStyle>
	);
}

// <Autocomplete
// 	size="small"
// 	disablePortal
// 	popupIcon={null}
// 	options={posts}
// 	getOptionLabel={(post) => post.title}
// 	renderInput={(params) => (
// 		<TextField
// 			{...params}
// 			placeholder="Search book..."
// 			InputProps={{
// 				...params.InputProps,
// 				startAdornment: (
// 					<>
// 						<InputAdornment position="start">
// 							<Box
// 								component={Icon}
// 								icon={searchFill}
// 								sx={{
// 									ml: 1,
// 									width: 20,
// 									height: 20,
// 									color: 'text.disabled',
// 								}}
// 							/>
// 						</InputAdornment>
// 						{params.InputProps.startAdornment}
// 					</>
// 				),
// 			}}
// 			onChange={handleInput}
// 		/>
// 	)}
// />