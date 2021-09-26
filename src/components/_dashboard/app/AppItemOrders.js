import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 2),
    color: theme.palette.warning.darker,
    backgroundColor: theme.palette.warning.lighter,
	minHeight: theme.spacing(34)
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
        theme.palette.warning.dark,
        0.24
    )} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders() {
    return (
        <RootStyle>
            <IconWrapperStyle>
				<Icon icon="icon-park-outline:good-two" width={35} height={35} />
            </IconWrapperStyle>
            <Typography variant="h3" sx={{ paddingBottom: 2 }}>도서추천</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                당신의 리뷰와 다른 유저들의 리뷰를 분석하여 최적의 도서를 추천해드립니다.
            </Typography>
        </RootStyle>
    );
}