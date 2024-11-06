import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineOppositeContentClasses,
} from "@mui/lab";
import { Link, Typography } from "@mui/material";

const pastInterviews = [
    {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        color: "primary",
        desc: "DSA Interview",
        link: "",
        linkText: ""
    },
    {
        date: "",
        time: "09:42:30 AM",
        color: "secondary",
        desc: "Python Interview",
        link: "",
        linkText: ""
    },
    {
        date: "",
        time: "12:35 AM",
        color: "error",
        desc: "Javascript Interview",
        link: "",
        linkText: ""
    },
    {
        date: "",
        time: "10:17 AM",
        color: "success",
        desc: "Javascript Interview",
        link: "",
        linkText: ""
    },
    {
        date: "",
        time: "02:04:43 PM",
        color: "warning",
        desc: "JavaScript Interview",
        link: "",
        linkText: ""
    },
]

const RecentTransactions = () => {
    return (
        <DashboardCard title="Recent Interviews">
            <>
                <Timeline
                    className="theme-timeline"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    sx={{
                        p: 0,
                        mb: "-40px",
                        "& .MuiTimelineConnector-root": {
                            width: "1px",
                            backgroundColor: "#808080",
                        },
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.5,
                            paddingLeft: 0,
                        },
                    }}
                >
                    {
                        Array.isArray(pastInterviews) && pastInterviews.length > 0 && pastInterviews.map((interview, index) => {
                            return (
                                <TimelineItem key={index}>
                                    <TimelineOppositeContent>
                                        {interview.time}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color={interview.color} variant="outlined" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography fontWeight="600">
                                            {interview.desc}
                                        </Typography>{" "}
                                        {interview.link && (
                                            <Link href={interview.link} underline="none">
                                                {interview.linkText}
                                            </Link>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            )
                        })
                    }

                </Timeline>
            </>
        </DashboardCard>
    );
};

export default RecentTransactions;
