"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";
import { colors } from "@/lib/colors";

interface ClaimsByStatusChartProps {
    height?: number;
}

const ClaimsByStatusChart = ({ height = 350 }: ClaimsByStatusChartProps) => {
    const { theme: mode } = useTheme();

    const series = [450, 320, 180, 120, 85];

    const options: any = {
        chart: {
            type: "donut",
            toolbar: {
                show: false,
            },
        },
        labels: ["Approved", "Pending", "In Review", "Denied", "Resubmitted"],
        colors: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"],
        legend: {
            position: "bottom",
            fontSize: "14px",
            fontFamily: "Inter",
            labels: {
                colors: mode === "dark" ? "#CBD5E1" : "#475569",
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return val.toFixed(1) + "%";
            },
            style: {
                fontSize: "12px",
                fontFamily: "Inter",
                fontWeight: "600",
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: "16px",
                            fontFamily: "Inter",
                            color: mode === "dark" ? "#CBD5E1" : "#475569",
                        },
                        value: {
                            show: true,
                            fontSize: "24px",
                            fontFamily: "Inter",
                            fontWeight: "bold",
                            color: mode === "dark" ? "#fff" : "#0f172a",
                            formatter: function (val: string) {
                                return val;
                            },
                        },
                        total: {
                            show: true,
                            label: "Total Claims",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            color: mode === "dark" ? "#CBD5E1" : "#475569",
                            formatter: function (w: any) {
                                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                            },
                        },
                    },
                },
            },
        },
        tooltip: {
            theme: mode === "dark" ? "dark" : "light",
            y: {
                formatter: function (val: number) {
                    return val + " claims";
                },
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    return (
        <Chart
            options={options}
            series={series}
            type="donut"
            height={height}
            width={"100%"}
        />
    );
};

export default ClaimsByStatusChart;
