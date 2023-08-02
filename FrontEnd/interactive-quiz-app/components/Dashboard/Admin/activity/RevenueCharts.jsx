"use client"
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChar() {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    // i wil add real data later
                    label: "Subscription Purchases $",
                    data: [1020, 570, 2250, 1738, 2482, 1784, 4220],
                    borderColor: "rgb(53,62,235)",
                    backgroundColor: "rgba(53,83,235,0.4)",
                },
            ]
        })
        setChartOptions({
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Daily Revenue"
                }
            },
            maintainAspectRatio: false,
            responsive: true
        })
    }, [])

    return (
        <>
            <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </>
    );
};
