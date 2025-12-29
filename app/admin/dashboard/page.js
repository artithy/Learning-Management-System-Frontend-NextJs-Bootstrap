"use client"

import { useState, useEffect } from "react";
import DashboardBox from "@/components/admin/DashboardBox";
import { Chart } from "primechart/chart";

export default function DashboardHome() {
    const [stats, setStats] = useState({});
    const [dayChart, setDayChart] = useState({ labels: [], data: [] });
    const [hourChart, setHourChart] = useState({ labels: [], data: [] });

    const fetchDashboard = async () => {
        try {

            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const resStats = await fetch(
                "http://127.0.0.1:8000/api/dashboard-stats",
                { headers }
            );
            setStats(await resStats.json());

            const resDays = await fetch(
                "http://127.0.0.1:8000/api/enrollments-by-days",
                { headers }
            );
            setDayChart(await resDays.json());

            const resHours = await fetch(
                "http://127.0.0.1:8000/api/enrollments-by-hours",
                { headers }
            );
            setHourChart(await resHours.json());
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const dayChartData = {
        label: dayChart.labels,
        datasets: [
            {
                labels: "Enrollments",
                backgroundColor: "#6366F1",
                data: dayChart.data,
            },
        ],
    };

    const hourChartData = {
        label: hourChart.labels,
        datasets: [
            {
                labels: "Enrollments",
                borderColor: "#10B981",
                fill: false,
                data: hourChart.data,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
    };

    return (
        <>

            <div className="container-fluid">
                <div className="row g-4 mb-4">
                    <div className="col-mb-3">
                        <DashboardBox
                            title="Today Enrollments"
                            value={stats.enrollment_today}
                        />
                    </div>

                    <div className="col-mb-3">
                        <DashboardBox
                            title="Payments Today"
                            value={stats.payment_today}
                        />

                    </div>

                    <div className="col-mb-3">
                        <DashboardBox
                            title="Accepted"
                            value={stats.accepted_enrollment}
                        />

                    </div>

                    <div className="col-mb-3">
                        <DashboardBox
                            title="Today Payment"
                            value={stats.total_payment}
                        />
                    </div>
                </div>


                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card shadow p-3">
                            <h5 className="mb-3">Enrollments(Last 7 Days)</h5>
                            <Chart
                                type="bar"
                                data={dayChartData}
                                options={chartOptions}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow p-3">
                            <h5 className="mb-3">Enrollments(Today by Hours)</h5>
                            <Chart
                                type="line"
                                data={hourChartData}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}