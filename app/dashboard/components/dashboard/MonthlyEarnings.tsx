'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab } from "@mui/material";
import {
    IconArrowUpRight,
    IconArrowDownRight,
    IconCurrencyDollar,
    IconWaveSine,
} from "@tabler/icons-react";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import { time } from "console";

const MonthlyEarnings = () => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const secondarylight = "#f5fcff";
    const errorlight = "#fdede8";

    const [timeArr, setTimeArr] = useState(getTimeArray(15));

    function getTimeArray(count: any) {
        const timeArray = [];
        // start from the current time - 1 minute
        const now = new Date();
        const nowMinusOneMinute = new Date(now.getTime() - 120000);

        for (let i = 0; i < count; i++) {
            const timeString = nowMinusOneMinute.toLocaleTimeString();
            timeArray.push(timeString);
            nowMinusOneMinute.setSeconds(nowMinusOneMinute.getSeconds() + 1);
        }

        return timeArray;
    }

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: "area",
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: "#adb0bb",
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: "sparklines",
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        fill: {
            colors: [function ({ value, seriesIndex, w }: any) {
                if (value == 0) {
                    return '#FF0000'
                } else if (value == 1) {
                    return '#6B8E23'
                } else if (value == 2) {
                    return '#8B0000'
                } else if (value == 3) {
                    return '#FFD700'
                } else if (value == 4) {
                    return '#4682B4'
                } else if (value == 5) {
                    return '#FF9800'
                } else if (value == 6) {
                    return '#546E7A'
                }
            }],
            // type: "solid",
            opacity: 0.05,
            gradient: {
                enabled: true,
                opacityFrom: 0.55,
                opacityTo: 0
            }
        },
        markers: {
            size: 5,
            colors: [function ({ value, seriesIndex, w }: any) {
                if (value == 0) {
                    return '#FF0000'
                } else if (value == 1) {
                    return '#6B8E23'
                } else if (value == 2) {
                    return '#8B0000'
                } else if (value == 3) {
                    return '#FFD700'
                } else if (value == 4) {
                    return '#4682B4'
                } else if (value == 5) {
                    return '#FF9800'
                } else if (value == 6) {
                    return '#546E7A'
                }
            }],
            strokeColor: primary,
            strokeWidth: 2
        },
        xaxis: {
            show: false,
            categories: timeArr,
            axisBorder: {
                show: false,
            },
            labels: {
                show: false,
            }
        },
        yaxis: {
            labels: {
                formatter: function (val: any) {
                    return audioMap[val];
                }
            }
        },
        tooltip: {
            theme: theme.palette.mode === "dark" ? "dark" : "light",
        },
    };
    const arr15 = Array.from({ length: 15 }, () =>
        Math.floor(Math.random() * 7)
    );
    const seriescolumnchart: any = [
        {
            name: "",
            color: primary,
            data: arr15,
        },
    ];

    function findMostFrequentValue(arr: any) {
        const frequencyMap: any = {};

        // Count occurrences of each value in the array
        arr.forEach((value: any) => {
            frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        });

        // Find the value with the highest frequency
        let mostFrequentValue;
        let highestFrequency = 0;

        for (const [value, frequency] of Object.entries(frequencyMap)) {
            if (frequency > highestFrequency) {
                mostFrequentValue = parseInt(value, 10);
                highestFrequency = frequency;
            }
        }

        return mostFrequentValue;
    }

    function getVariation() {
        let rNumber;

        do {
            rNumber = Math.floor(Math.random() * 17) - 8;
        } while (rNumber === 0);

        return rNumber;
    }

    const variation = getVariation();

    const audioMap:
        {
            [key: number]: string;
        } = {
        0: "Angry",
        1: "Disgust",
        2: "Fear",
        3: "Happy",
        4: "Sad",
        5: "Surprise",
        6: "Neutral",
    };

    return (
        <DashboardCard
            title="Audio Analysis"
            // action={
            //     <Fab color="secondary" size="medium" sx={{ color: "#ffffff" }}>
            //         <IconWaveSine width={24} />
            //     </Fab>
            // }
            footer={
                <Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="area"
                    height="100px"
                />
            }
        >
            <>
                <Typography variant="h3" fontWeight="700" mt="-20px">
                    {/* {audioMap[Math.floor(Math.random() * 7)]} */}
                    {/* mode value from arr15 */}
                    {Array.isArray(arr15) && arr15.length > 0 && audioMap && audioMap[findMostFrequentValue(arr15)]}
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
                    {
                        variation > 0 ? (
                            <Avatar sx={{ bgcolor: secondarylight, width: 27, height: 27 }}>
                                <IconArrowUpRight width={20} color="#3DD598" />
                            </Avatar>
                        ) : (
                            <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                                <IconArrowDownRight width={20} color="#FA896B" />
                            </Avatar>
                        )
                    }
                    <Typography variant="subtitle2" fontWeight="600">
                        {variation}%
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        last interview
                    </Typography>
                </Stack>
            </>
        </DashboardCard>
    );
};

export default MonthlyEarnings;
