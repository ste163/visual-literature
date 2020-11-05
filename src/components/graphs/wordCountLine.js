export const wordCountLine = (progressDateLabels, progressWordsWritten) => {
    return {
       type: 'line',
        data: {
            labels: progressDateLabels,
            datasets: [{
                data: progressWordsWritten,
                label: "Words Written",
                borderColor: "#76cdc7ff",
                fill: true,
                backgroundColor: "rgba(195, 232, 229, 0.5)",
            }
            ]
        },

        scales: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                display: true,
                min: 0,
                max: 500
            }]
        },

        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days in month'
                    },
                    display: true,
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Words written'
                    },
                    gridLines: {
                        display: true,
                        color: "#ACACAC"
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 100
                    }
                }]
            },        
            legend: {
                display: false
            },
            tooltip: {
                position: "nearest"
            },
            title: {
            display: false
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    }
}