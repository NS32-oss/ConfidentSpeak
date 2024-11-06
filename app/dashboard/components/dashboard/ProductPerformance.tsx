import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import DashboardCard from "@/app/dashboard//components/shared/DashboardCard";

const products = [
    {
        id: "🥇",
        name: "Siddh Shah",
        post: "Web Designer",
        pname: "HR Interview",
        priority: "High",
        pbg: "primary.main",
        budget: "1200",
    },
    {
        id: "🥈",
        name: "Archit Rathod",
        post: "Fullstack Developer",
        pname: "Javascript Interview",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "1050",
    },
    {
        id: "🥉",
        name: "Gargi Sathe",
        post: "Project Manager",
        pname: "Behavioural Interview",
        priority: "High",
        pbg: "primary.main",
        budget: "850",
    },
    {
        id: <>4<sup>th</sup></>,
        name: "Mokshit Surana",
        post: "Frontend Engineer",
        pname: "Python Interview",
        priority: "Low",
        pbg: "success.main",
        budget: "540",
    },
    {
        id: <>5<sup>th</sup></>,
        name: "Archit Rathod",
        post: "Frontend Developer",
        pname: "Javascript Interview",
        priority: "Low",
        pbg: "success.main",
        budget: "400",
    },
    {
        id: <>6<sup>th</sup></>,
        name: "Siddh Shah",
        post: "Frontend Engineer",
        pname: "Java Interview",
        priority: "Critical",
        pbg: "error.main",
        budget: "400",
    },
    {
        id: <>7<sup>th</sup></>,
        name: "Gargi Sathe",
        post: "LLM Engineer",
        pname: "Python Interview",
        priority: "Low",
        pbg: "success.main",
        budget: "320",
    },
];

const ProductPerformance = () => {
    return (
        <DashboardCard title="Leaderboard">
            <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2,
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    Best For
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    Points
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "24px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight={600}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textSecondary"
                                        variant="subtitle2"
                                        fontWeight={400}
                                    >
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">
                                        {product.budget}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
