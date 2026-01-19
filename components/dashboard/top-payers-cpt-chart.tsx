"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";

interface TopPayersCptChartProps {
    height?: number;
}

const TopPayersCptChart = ({ height = 350 }: TopPayersCptChartProps) => {
    const { theme: mode } = useTheme();

    const series = [
        {
            name: "99213",
            data: [120, 98, 85, 72, 65, 58, 52, 48],
        },
        {
            name: "99214",
            data: [95, 88, 78, 68, 62, 55, 48, 42],
        },
        {
            name: "99232",
            data: [75, 70, 65, 58, 52, 48, 42, 38],
        },
        {
            name: "Hospital",
            data: [65, 58, 52, 45, 42, 38, 35, 32],
        },
        {
            name: "New Pt",
            data: [55, 48, 45, 38, 35, 32, 28, 25],
        },
    ];

    const options: any = {
        chart: {
            type: "bar",
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%",
            },
        },
        xaxis: {
            categories: ["BCBS", "United", "Aetna", "Cigna", "Humana", "Medicare", "Medicaid", "Kaiser"],
            labels: {
                style: {
                    colors: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                    fontSize: "11px",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                },
            },
            title: {
                text: "Number of Claims",
                style: {
                    color: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontSize: "12px",
                    fontFamily: "Inter",
                }
            }
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            fontSize: "11px",
            fontFamily: "Inter",
            labels: {
                colors: mode === "dark" ? "#CBD5E1" : "#475569",
            },
            markers: {
                radius: 12,
            },
        },
        colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        tooltip: {
            theme: mode === "dark" ? "dark" : "light",
            y: {
                formatter: function (val: number) {
                    return val + " claims";
                },
            },
        },
        grid: {
            show: true,
            borderColor: mode === "dark" ? "#334155" : "#E2E8F0",
            strokeDashArray: 4,
        },
        dataLabels: {
            enabled: false,
        },
    };

    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            height={height}
            width={"100%"}
        />
    );
};

export default TopPayersCptChart;
