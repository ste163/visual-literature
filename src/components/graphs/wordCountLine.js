export const wordCountLine = (wordCountArray, daysPerFrequency) => {
    return {
        type: "line",
        data: {
            labels: wordCountArray,
            datasets: [{
                data: wordCountArray,
                label: "words written"
            }]
        },
    }
}