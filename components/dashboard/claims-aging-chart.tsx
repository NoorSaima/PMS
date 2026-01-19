"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";

interface ClaimsAgingChartProps {
    height?: number;
}

const ClaimsAgingChart = ({ height = 350 }: ClaimsAgingChartProps) => {
    const { theme: mode } = useTheme();

    const series = [
        {
            name: "Outstanding Amount",
            data: [125000, 89000, 67000, 145000],
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
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 4,
                dataLabels: {
                    position: "top",
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return "$" + (val / 1000).toFixed(0) + "K";
            },
            offsetY: -20,
            style: {
                fontSize: "12px",
                fontFamily: "Inter",
                fontWeight: "600",
                colors: [mode === "dark" ? "#CBD5E1" : "#475569"],
            },
        },
        xaxis: {
            categories: ["0-30 Days", "31-60 Days", "61-90 Days", "90+ Days"],
            labels: {
                style: {
                    colors: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            title: {
                text: "Amount ($)",
                style: {
                    color: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                },
            },
            labels: {
                formatter: function (val: number) {
                    return "$" + (val / 1000).toFixed(0) + "K";
                },
                style: {
                    colors: mode === "dark" ? "#CBD5E1" : "#475569",
                    fontFamily: "Inter",
                },
            },
        },
        colors: ["#10b981", "#f59e0b", "#ef4444", "#7f1d1d"],
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

export default ClaimsAgingChart;
