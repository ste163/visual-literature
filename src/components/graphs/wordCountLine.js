export const wordCountLine = (progressDateLabels, progressWordsWritten) => {
    return {
       type: 'line',
        data: {
            // PROBABLY NEED TO FEED IN THE INCOMING PROGRESS
            
            // GENERATE LABELS FROM WHEN  PROGRESS WAS MADE
            labels: progressDateLabels,
            datasets: [{
                // THE ARRAY OF WORDS WRITTEN 
                data: progressWordsWritten,
                label: "Words Written",
                borderColor: "#76cdc7ff",
                fill: true,
                backgroundColor: "#c3e8e5ff",
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
            tooltip: {
                position: "nearest"
            },
            title: {
            display: false
            },
            scaleLineColor: "black",
            scaleBeginAtZero: true,
            responsive: true,
            maintainAspectRatio: false,
        }
    }
}