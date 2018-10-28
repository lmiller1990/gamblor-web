const options = ({ title }) => ({
  title: {
    text: title,
    display: true
  },

  legend: {
    display: false
  },

  responsive: true,
  maintainAspectRatio: false,

  scales: {
    xAxes: [{
      type: 'linear',
      display: true,
      ticks: {
        min: 0,
        stepSize: 2,
        fontSize: 10
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }]
  }
})

export { options }
