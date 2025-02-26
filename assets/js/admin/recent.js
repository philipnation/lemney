document.addEventListener("DOMContentLoaded", function () {

    const pieChartData = [
        {
            "title": "Honey Orders",
            "size": 158,
            "colour": "#4E2708"
        },
        {
            "title": "Logistics",
            "size": 75,
            "colour": "#F68F18",
        },
        {
            "title": "Home Service",
            "size": 54,
            "colour": "#FFBF00"
        }
    ];

    const barCharData = [
        {
            "title": "Web Visits",
            "size": 12000,
            "colour": "#F37E21"
        },
        {
            "title": "Reg. Users",
            "size": 16000,
            "colour": "#FBC02D"
        }
    ];

    // Register the plugin
    Chart.register(ChartDataLabels);

    const myPieChartCtx = document.getElementById("myPieChart").getContext("2d");

    // 
    new Chart(myPieChartCtx, {
        type: "pie",
        data: {
            labels: pieChartData.map(e => e.title),
            datasets: [
                {
                    data: [35, 40, 25],
                    backgroundColor: pieChartData.map(e => e.colour),
                    hoverOffset: 10
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12
                    }
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    formatter: (value) => value + "%",
                    color: "#fff",
                    font: {
                        weight: "bold",
                        size: 14
                    }
                }
            }
        }
    });

    const myBarCharCtx = document.getElementById("myBarChart").getContext("2d");

    // 
    new Chart(myBarCharCtx, {
        type: "bar",
        data: {
            labels: barCharData.map(e => e.title),
            datasets: [{
                data: barCharData.map(e => e.size),
                backgroundColor: barCharData.map(e => e.colour),
                borderRadius: 10,
                barPercentage: 1,
                categoryPercentage: 0.6
            }]
        },
        options: {
            indexAxis: "y",
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: {
                    anchor: "center",
                    align: "right",
                    color: "#fff",
                    font: {
                        weight: "bold",
                        size: 14
                    },
                    formatter: (value) => value / 1000 + "k",
                }
            },
            scales: {
                x: { display: false },
                y: {
                    grid: { display: false },
                    ticks: {
                        font: {
                            weight: "bold",
                            size: 14
                        },
                        color: "#000",
                        backgroundColor: "blue"
                    }
                }
            }
        }
    })
})