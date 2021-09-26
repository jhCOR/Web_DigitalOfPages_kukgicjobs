import { useFormik } from 'formik';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Button, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
	ProductSort,
	ProductList,
	ProductCartWidget,
	ProductFilterSidebar,
} from '../components/_dashboard/products';
//
import HISTORYS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
	const [openFilter, setOpenFilter] = useState(false);

	const formik = useFormik({
		initialValues: {
			gender: '',
			category: '',
			colors: '',
			priceRange: '',
			rating: '',
		},
		onSubmit: () => {
			setOpenFilter(false);
		},
	});

	const { resetForm, handleSubmit } = formik;

	const handleOpenFilter = () => {
		setOpenFilter(true);
	};

	const handleCloseFilter = () => {
		setOpenFilter(false);
	};

	const handleResetFilter = () => {
		handleSubmit();
		resetForm();
	};

	return (
		<Page title="Dashboard: History">
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					<Typography variant="h4" gutterBottom>
						Book History
					</Typography>
					<Button
						variant="contained"
						component={RouterLink}
						to={`/dashboard/edit`}
						startIcon={<Icon icon={plusFill} />}
					>
						발자취 작성
					</Button>
				</Stack>

				<Stack
					direction="row"
					flexWrap="wrap-reverse"
					alignItems="center"
					justifyContent="flex-end"
					sx={{ mb: 5 }}
				>
					<Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
						<ProductFilterSidebar
							formik={formik}
							isOpenFilter={openFilter}
							onResetFilter={handleResetFilter}
							onOpenFilter={handleOpenFilter}
							onCloseFilter={handleCloseFilter}
						/>
						<ProductSort />
					</Stack>
				</Stack>

				<ProductList products={HISTORYS} />
				<ProductCartWidget />
			</Container>
		</Page>
	);
}