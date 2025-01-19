import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './purpleTheme';

type AppThemeProps = {
    children: React.ReactNode
}

export const AppTheme = ({ children }: AppThemeProps) => {
    return <ThemeProvider theme={purpleTheme}>
        <CssBaseline />
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </ThemeProvider>
}