export const horizontalBar = (goalProgression, daysPerFrequency) => {
    return {
        type: "horizontalBar",
        data: {
          labels: ["Progress"],
          datasets: [{
              label: "Progress",
              data: [goalProgression],
              backgroundColor:"#171717ff",
              borderWidth: 0,
          },
          {
              label: "Goal",
              data: [daysPerFrequency],
              backgroundColor: "#FCFCFC",
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