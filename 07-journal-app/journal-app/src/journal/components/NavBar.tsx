import { AppBar, Grid2, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { startUserLogout } from '../../store/auth/authThunks';
import { useDispatch } from 'react-redux';



export const NavBar = ({ drawerWidth = 240, navBarHeight= 64 }) => {
    const dispatch = useDispatch();

    const onLogout = ()=>{
        const logoutUserThunk = startUserLogout();
        logoutUserThunk(dispatch)
    }
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                height: navBarHeight,
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    aria-label='menu-button'
                >
                    <MenuOutlined />
                </IconButton>

                <Grid2 container direction='row' sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                    <IconButton color='error' onClick={()=>onLogout()} aria-label='logout-button'>
                        <LogoutOutlined />
                    </IconButton>
                </Grid2>
            </Toolbar>
        </AppBar>
    )
};
