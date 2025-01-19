import { Box } from '@mui/material'
import React from 'react'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

type JournalLayoutProps = {
    children: React.ReactNode
}
export const JournalLayout = ({ children }: JournalLayoutProps) => {
    const appBarHeight = 64; 

    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <NavBar navBarHeight={appBarHeight} />

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: `${appBarHeight}px`, // Añade un margen superior para evitar superposición
                }}
            >
                {children}
            </Box>
        </Box>
    )
}
