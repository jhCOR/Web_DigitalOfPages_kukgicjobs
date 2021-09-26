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
    color: theme.palette.secondary.darker,
    backgroundColor: theme.palette.secondary.lighter,
    minHeight: theme.spacing(50),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
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
    color: theme.palette.secondary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
        theme.palette.secondary.dark,
        0.24
    )} 100%)`,
}));

// ----------------------------------------------------------------------

export default function AppBookHistory() {
    return (
        <RootStyle>
            <IconWrapperStyle>
				<Icon icon="ic:round-history-edu" width={35} height={35}/>
            </IconWrapperStyle>
            <Typography variant="h3" sx={{ paddingBottom: 2 }}>
                Book History
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                각자의 독서 역사를 기록해 보세요! 매번 새로운 독서 기록을 적는게 아닙니다!
                여려분들의 책을 만들어 나가는 거죠!
            </Typography>
        </RootStyle>
    );
}