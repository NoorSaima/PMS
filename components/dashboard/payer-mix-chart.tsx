"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";

interface PayerMixChartProps {
    height?: number;
}

const PayerMixChart = ({ height = 280 }: PayerMixChartProps) => {
    const { theme: mode } = useTheme();

    const series = [
        {
            name: "Medicare",
            data: [44, 55, 41, 67, 22, 43, 21, 49, 30, 42, 38, 45],
        },
        {
            name: "Medicaid",
            data: [13, 23, 20, 8, 13, 27, 33, 12, 15, 18, 22, 25],
        },
        {
            name: "Private",
            data: [11, 17, 15, 15, 21, 14, 15, 13, 18, 20, 16, 19],
        },
        {
            name: "Self-Pay",
            data: [21, 7, 25, 13, 22, 8, 12, 15, 10, 8, 12, 14],
        },
        {
            name: "Workers Comp",
            data: [8, 10, 12, 9, 11, 13, 10, 14, 12, 11, 9, 10],
        },
    ];

    const options: any = {
        chart: {
            type: "line",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        markers: {
            size: 0,
            hover: {
                size: 5,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            labels: {
                style: {
                    colors: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                    fontSize: "10px",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                    fontSize: "11px",
                },
            },
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
                width: 10,
                height: 10,
                radius: 12,
            },
        },
        colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        tooltip: {
            theme: mode === "dark" ? "dark" : "light",
            shared: true,
            intersect: false,
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

export default PayerMixChart;
