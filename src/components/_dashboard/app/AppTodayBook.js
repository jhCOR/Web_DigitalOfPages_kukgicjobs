import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 5),
    color: theme.palette.success.darker,
    backgroundColor: theme.palette.success.lighter,
    minHeight: theme.spacing(50),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    // margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.success.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.success.dark, 0)} 0%, ${alpha(
        theme.palette.success.dark,
        0.24
    )} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppTodayBook() {
    return (
        <RootStyle>
            <IconWrapperStyle>
                <Icon icon="icon-park-outline:glove" width={35} height={35} />
            </IconWrapperStyle>
            <Typography variant="h3" sx={{ paddingBottom: 2 }}>
                Today's Book?
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                뭘 읽을지 모르겠다구요? 저희를 믿어보세요! 오늘 소중한 당신에게 소개될 운 좋은 책의
                주인공은 어떤게 될까 기대됩니다!
            </Typography>
        </RootStyle>
    );
}