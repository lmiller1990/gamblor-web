const options = {
  title: {
    text: 'Average First Blood %',
    display: true
  },

  scales: {
    xAxes: [{
      gridLines: {
        // color: 'white',
      },

      type: 'linear',
      display: true,
      ticks: {
        min: 0,
        steps: 1
      }
    }],
    yAxes: [{
      gridLines: {
        // color: 'white',
      },

      ticks: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }]
  }
}

export { options }
