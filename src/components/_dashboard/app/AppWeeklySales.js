import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 2),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter,
    minHeight: theme.spacing(34),
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
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppWeeklySales() {
    return (
        <RootStyle>
            <IconWrapperStyle>
                <Icon icon="bx:bxs-book-alt" width={35} height={35} />
            </IconWrapperStyle>
            <Typography variant="h3" sx={{ paddingBottom: 2 }}>
                도서 대출/예약/반납
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                손쉬운 도서 대출/반납과 예약 기능을 누려보세요!
            </Typography>
        </RootStyle>
    );
}