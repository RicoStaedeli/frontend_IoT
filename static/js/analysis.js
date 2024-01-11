function passVariable(vars) {
    return vars
}

var config_chart_base = {
    data: {
        labels: [],
        datasets: [
            {
                label: "Poops per Food",
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: [],
                fill: false,
            }
        ],
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
            display: false,
            text: "Sales Charts",
            fontColor: "white",
        },
        legend: {
            labels: {
                fontColor: "white",
            },
            align: "end",
            position: "bottom",
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: "Month",
                        fontColor: "white",
                    },
                    gridLines: {
                        display: false,
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: "rgba(33, 37, 41, 0.3)",
                        zeroLineColor: "rgba(0, 0, 0, 0)",
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: "rgba(255,255,255,.7)",
                        beginAtZero: true
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: "Value",
                        fontColor: "white",
                    },
                    gridLines: {
                        borderDash: [3],
                        borderDashOffset: [3],
                        drawBorder: false,
                        color: "rgba(255, 255, 255, 0.15)",
                        zeroLineColor: "rgba(33, 37, 41, 0)",
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
        },
    },
};

