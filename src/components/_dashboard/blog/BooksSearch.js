// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({}));

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

BooksSearch.propTypes = {
	formInput: PropTypes.string,
	onFormInput: PropTypes.func
};

export default function BooksSearch({ formInput, onFormInput }) {
	
	return (
		<RootStyle>
			<SearchStyle
				value={formInput}
				onChange={onFormInput}
				placeholder="Search books..."
				startAdornment={
					<InputAdornment position="start">
						<Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
					</InputAdornment>
				}
			/>
		</RootStyle>
	);
}