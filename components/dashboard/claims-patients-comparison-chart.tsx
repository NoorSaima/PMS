"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";

interface ClaimsPatientsComparisonChartProps {
    height?: number;
}

const ClaimsPatientsComparisonChart = ({ height = 350 }: ClaimsPatientsComparisonChartProps) => {
    const { theme: mode } = useTheme();

    const series = [
        {
            name: "Total Claims",
            type: "line",
            data: [420, 485, 512, 478, 545, 598, 612, 650, 689, 715, 742, 780],
        },
        {
            name: "Total Patients",
            type: "line",
            data: [180, 195, 210, 198, 225, 245, 258, 275, 289, 305, 318, 335],
        },
    ];

    const options: any = {
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            width: [3, 3],
            curve: "smooth",
        },
        markers: {
            size: [5, 5],
            strokeWidth: 2,
            hover: {
                size: 7,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            labels: {
                style: {
                    colors: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                },
            },
        },
        yaxis: [
            {
                title: {
                    text: "Total Claims",
                    style: {
                        color: mode === "dark" ? "#CBD5E1" : "#475569",
                        fontFamily: "Inter",
                    },
                },
                labels: {
                    style: {
                        colors: mode === "dark" ? "#CBD5E1" : "#475569",
                        fontFamily: "Inter",
                    },
                },
            },
            {
                opposite: true,
                title: {
                    text: "Total Patients",
                    style: {
                        color: mode === "dark" ? "#CBD5E1" : "#475569",
                        fontFamily: "Inter",
                    },
                },
                labels: {
                    style: {
                        colors: mode === "dark" ? "#CBD5E1" : "#475569",
                        fontFamily: "Inter",
                    },
                },
            },
        ],
        legend: {
            position: "top",
            horizontalAlign: "right",
            fontSize: "12px",
            fontFamily: "Inter",
            labels: {
                colors: mode === "dark" ? "#CBD5E1" : "#475569",
            },
            markers: {
                width: 10,
                height: 10,
                radius: 12,
            },
        },
        colors: ["#3b82f6", "#10b981"],
        tooltip: {
            theme: mode === "dark" ? "dark" : "light",
            shared: true,
            intersect: false,
        },
        grid: {
            show: true,
            borderColor: mode === "dark" ? "#334155" : "#E2E8F0",
            strokeDashArray: 4,
        },
    };

    return (
        <Chart
            options={options}
            series={series}
            type="line"
            height={height}
            width={"100%"}
        />
    );
};

export default ClaimsPatientsComparisonChart;
