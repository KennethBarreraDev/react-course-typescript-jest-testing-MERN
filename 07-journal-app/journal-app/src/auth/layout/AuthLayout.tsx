import { Grid2, Typography } from "@mui/material"
import React from "react";

type AuthLayoutProps = {
    descriptor: string,
    children: React.ReactNode
}

export const AuthLayout = React.memo(
    ({descriptor, children}: AuthLayoutProps) => {
        return (
            <Grid2
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}>
                <Grid2
                    size={12}
                    className="box-shadow"
                    sx={{
                        backgroundColor: "white",
                        padding: 3,
                        borderRadius: 2,
                        maxWidth: "100vh",
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        {descriptor}
                    </Typography>
                    {children}
                </Grid2>
            </Grid2>
        )
    }
)
