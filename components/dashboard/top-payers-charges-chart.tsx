"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";

interface TopPayersChargesChartProps {
    height?: number;
}

const TopPayersChargesChart = ({ height = 350 }: TopPayersChargesChartProps) => {
    const { theme: mode } = useTheme();

    const series = [
        {
            name: "Charges",
            data: [425000, 380000, 345000, 298000, 265000, 240000, 215000, 190000],
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
                horizontal: true,
                borderRadius: 4,
                barHeight: "60%",
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: "start",
            formatter: function (val: number) {
                return "$" + (val / 1000).toFixed(0) + "K";
            },
            style: {
                fontSize: "12px",
                fontFamily: "Inter",
                colors: [mode === "dark" ? "#fff" : "#0f172a"],
            },
            offsetX: 10,
        },
        xaxis: {
            categories: ["Blue Cross", "UnitedHealth", "Aetna", "Cigna", "Humana", "Medicare", "Medicaid", "Kaiser"],
            labels: {
                formatter: function (val: number) {
                    return "$" + (val / 1000).toFixed(0) + "K";
                },
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
        colors: ["#3b82f6"],
        tooltip: {
            theme: mode === "dark" ? "dark" : "light",
            y: {
                formatter: function (val: number) {
                    return "$" + val.toLocaleString();
                },
            },
        },
        grid: {
            show: true,
            borderColor: mode === "dark" ? "#334155" : "#E2E8F0",
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
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

export default TopPayersChargesChart;
