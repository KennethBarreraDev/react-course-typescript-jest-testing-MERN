import { StarBorderOutlined } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";

export const NothingSelectedView = () => {
    return (
        <Grid2
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "calc(100vh - 110px)",
                backgroundColor: "primary.main",
                textAlign: "center", 
            }}
        >
            <Grid2>
                <StarBorderOutlined sx={{ fontSize: 80, color: "white" }} />
            </Grid2>
            <Grid2>
                <Typography variant="h5" color="white">
                    Selecciona algo o crea una nueva entrada
                </Typography>
            </Grid2>
        </Grid2>
    );
};
