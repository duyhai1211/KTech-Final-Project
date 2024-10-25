import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TodayReservation from './TodayReservation';
import { useState, useMemo } from 'react';
import Reservation from './Reservation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ko from 'dayjs/locale/ko';
dayjs.locale('ko');
const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    height: '100%',  // Ensure Paper fills the Grid's height
    display: 'flex', // Center content vertically if desired
    flexDirection: 'column',
    justifyContent: 'center',
}));

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = useState(initialPath);

    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

export default function ResAdminPage(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    //const demoWindow = window ? window() : undefined;

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ko"
        >
            <AppProvider
                navigation={NAVIGATION}
                router={router}
                theme={demoTheme}
                //window={demoWindow}
                window={window?.()}

            >
                <DashboardLayout>
                    <PageContainer>
                        <Grid container spacing={1}>
                            <Grid size={12} />
                            <Grid item xs={12} size={6}>
                                <StyledPaper>
                                    <Typography variant="h6">오늘 예약</Typography>
                                    <Typography><TodayReservation /></Typography>
                                </StyledPaper>
                            </Grid>
                            <Grid size={6}>
                                <StyledPaper>
                                    <Typography variant="h6">모임단 평균인원</Typography>
                                    <Typography><TodayReservation /></Typography>
                                </StyledPaper>
                            </Grid>

                            {/* <Grid size={12}>
                                <StyledPaper>
                                    <Typography variant="h6">Chart</Typography>
                                    <Typography><TodayReservation /></Typography>
                                </StyledPaper>
                            </Grid> */}
                            <Grid size={12}>
                                <StyledPaper>
                                    <Typography variant="h6">Reservation List</Typography>
                                    <Typography><Reservation /></Typography>
                                </StyledPaper>
                            </Grid>

                            <Grid size={3}>
                                <Skeleton height={100} />
                            </Grid>
                            <Grid size={3}>
                                <Skeleton height={100} />
                            </Grid>
                            <Grid size={3}>
                                <Skeleton height={100} />
                            </Grid>
                            <Grid size={3}>
                                <Skeleton height={100} />
                            </Grid>
                        </Grid>
                    </PageContainer>
                </DashboardLayout>
            </AppProvider>
        </LocalizationProvider>
    );
}
