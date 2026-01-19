"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";

interface TopPayersVolumeChartProps {
    height?: number;
}

const TopPayersVolumeChart = ({ height = 300 }: TopPayersVolumeChartProps) => {
    const { theme: mode } = useTheme();

    const series = [
        {
            name: "Encounters",
            data: [850, 720, 680, 590, 540, 480, 420, 380],
        },
    ];

    const options: any = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                horizontal: false,
                columnWidth: "60%",
                distributed: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#3b82f6", "#06b6d4", "#10b981", "#84cc16", "#f59e0b", "#f97316", "#ef4444", "#ec4899"],
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
        },
        legend: {
            show: false,
        },
        tooltip: {
            theme: mode === "dark" ? "dark" : "light",
            y: {
                formatter: function (val: number) {
                    return val + " encounters";
                },
            },
        },
        grid: {
            show: true,
            borderColor: mode === "dark" ? "#334155" : "#E2E8F0",
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
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

export default TopPayersVolumeChart;
