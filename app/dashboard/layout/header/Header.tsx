import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import {
    Box,
    AppBar,
    Toolbar,
    styled,
    Stack,
    IconButton,
    Badge,
    Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";

interface ItemType {
    toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
    const pathname = usePathname();
    // console.log(pathname);

    // set meta tags
    useEffect(() => {
        document.title = "Ascend.ai | Dashboard";
    }, []);
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: "none",
        background: theme.palette.background.paper,
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        [theme.breakpoints.up("lg")]: {
            minHeight: "70px",
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: "100%",
        color: theme.palette.text.secondary,
    }));

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleMobileSidebar}
                    sx={{
                        display: {
                            lg: "none",
                            xs: "inline",
                        },
                    }}
                >
                    <IconMenu width="20" height="20" />
                </IconButton>

                <img
                    className="h-12 w-40"
                    src={"/assets/logo/logo.png"}
                    alt="Courses-Logo"
                />

                {/* <IconButton
                    size="large"
                    aria-label="show 11 new notifications"
                    color="inherit"
                    aria-controls="msgs-menu"
                    aria-haspopup="true"
                >
                    <Badge variant="dot" color="primary">
                        <IconBellRinging size="21" stroke="1.5" />
                    </Badge>
                </IconButton> */}
                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    {pathname === "/dashboard" ? (
                        <>
                            <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                href="/code"
                            >
                                Code Test
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                target="_blank"
                                href="https://ascend-ai-chatbot.vercel.app/"
                            >
                                Chat
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                target="_blank"
                                href="/leaderboard"
                            >
                                Leaderboard
                            </Button>

                        </>

                    ) : (
                        <>

                            <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                href="/"
                            >
                                Home
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                href="/code"
                            >
                                Code Test
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                target="_blank"
                                href="https://ascend-ai-chatbot.vercel.app/"
                            >
                                Chat
                            </Button>
                        </>

                    )}
                    {/* <Profile /> */}
                    <UserButton afterSignOutUrl="/" />
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

Header.propTypes = {
    sx: PropTypes.object,
};

export default Header;
