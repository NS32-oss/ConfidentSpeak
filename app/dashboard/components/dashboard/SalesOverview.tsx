import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
    // select
    const [month, setMonth] = useState("1");
    const [optionscolumnchart, setOptionsColumnChart] = useState<any>({});

    const arr25 = Array.from({ length: 25 }, () =>
        Math.floor(Math.random() * 6) + 1
    );
    const [y, setY] = useState(arr25);
    // timestamps
    const [x, setX] = useState(getTimeArray(25));

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

    const videoMap:
        {
            [key: number]: string;
        } = {
        1: "Disgust",
        2: "Fear",
        3: "Happy",
        4: "Sad",
        5: "Surprise",
        6: "Neutral",
    };

    const videoMapFunc = (x: number[]) => {
        // loop over the array and map the values to the corresponding strings
        let y: string[] = [];
        x.forEach((element) => {
            y.push(videoMap[element]);
        });
        return y;
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    useEffect(() => {


        const emotionColors = {
            1: "red",
            2: "yellow",
            3: "green",
            4: "blue",
            5: "orange",
            6: "grey",
        };

        setOptionsColumnChart({
            chart: {
                type: "bar",
                fontFamily: "'Plus Jakarta Sans', sans-serif;",
                foreColor: "#000",
                toolbar: {
                    show: true,
                },
                height: 370,
            },
            // colors: [primary, secondary],
            colors: [function ({ value, seriesIndex, w }: any) {
                if (value == 1) {
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
            plotOptions: {
                bar: {
                    horizontal: false,
                    barHeight: "60%",
                    columnWidth: "42%",
                    borderRadius: [6],
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "all",
                },
            },
            stroke: {
                show: true,
                width: 5,
                lineCap: "butt",
                colors: ["transparent"],
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                position: "top",
                horizontalAlign: "start",
                offsetX: 0,
                offsetY: -10,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    width: 10,
                    height: 10,
                    strokeWidth: 0,
                    strokeColor: "#fff",
                    fillColors: undefined,
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0,
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 10,
                },
            },
            grid: {
                borderColor: "rgba(0,0,0,0.3)",
                strokeDashArray: 3,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            yaxis: {
                // show: false,
                tickAmount: 6,
                // const emotionLabels = y.map(emotionValue => videoMap[emotionValue]);
                labels: {
                    formatter: function (val: any) {
                        return videoMap[val];
                    }
                }
            },
            xaxis: {
                categories: x,
                axisBorder: {
                    show: false,
                },
            },
            tooltip: {
                theme: theme.palette.mode === "dark" ? "dark" : "light",
                fillSeriesColor: false,
                x: {
                    show: true
                },
            },
            labels: {
                style: {
                    colors: [function ({ value, seriesIndex, w }: any) {
                        if (value == 1) {
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
                }
            },
            responsive: [
                {
                    breakpoint: 1000,
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: false
                            }
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        });
    }, []);

    const seriescolumnchart: any = [
        {
            name: "Emotion",
            data: y,
        },
    ];
    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    const [columnChart, setColumnChart] = useState<any>([]);

    return (
        <DashboardCard
            title="Video Analysis"
        >
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={400}
            />
        </DashboardCard>
    );
};

export default SalesOverview;
