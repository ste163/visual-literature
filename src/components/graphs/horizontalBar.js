export const horizontalBar = (goalProgression, daysPerFrequency) => {
    const style = getComputedStyle(document.body)
    const progBarColor = style.getPropertyValue('--progressBar')
    const progBarBackgroundColor = style.getPropertyValue('--progressBarBackground')

    return {
        type: "horizontalBar",
        data: {
          labels: ["Progress"],
          datasets: [{
              label: "Progress",
              data: [goalProgression],
              backgroundColor: progBarColor,
              borderWidth: 0,
          },
          {
              label: "Goal",
              data: [daysPerFrequency],
              backgroundColor: progBarBackgroundColor,
              borderWidth: 0,
          },
          ],
        },

        options: {

        responsive: true,
        maintainAspectRatio: false,

          tooltips: {
              enabled: false,
          },

          animation: {
              duration: 800
          },

          events:[],

          scales: {
              xAxes: [{
                  stacked: true,
                  gridLines: {
                      display: false
                  },
                  ticks: {
                      min: 0,
                      max: daysPerFrequency,
                      display: false
                  },
                  scaleLabel: {
                      display: false
                  }
              }],

              yAxes: [{
                  stacked: true,
                  gridLines: {
                      display: false
                  },
                  ticks: {
                      min: 0,
                      display: false
                  } 
              }, { 
                  stacked: true,
                  display: false,
              }],
          },
          
          legend: {
              display: false
          }
        }
    }
}