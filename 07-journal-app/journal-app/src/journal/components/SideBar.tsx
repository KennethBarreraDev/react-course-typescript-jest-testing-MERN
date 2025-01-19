import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SidebarItem } from './SibarItem';
import { useMemo } from 'react';

export const SideBar = ({ drawerWidth = 240 }) => {
    const username = useSelector((state: RootState) => state.auth.displayName);
    const userNotes = useSelector((state: RootState) => state.journal.notes)
    
 
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent'
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                   {username ?? ''}
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    userNotes.map( (note) => (
                       <SidebarItem {...note}/>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}