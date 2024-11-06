"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/dashboard/components/container/PageContainer";
// components

import ProductPerformance from "@/app/dashboard/components/dashboard/ProductPerformance";

const Leaderboard = () => {

    return (
        <PageContainer title="Leaderboard" description="this is Leaderboard Page">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <ProductPerformance />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Leaderboard
