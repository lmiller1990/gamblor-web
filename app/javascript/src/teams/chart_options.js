const options = {
  scales: {
    xAxes: [{
      type: 'linear',
      display: true,
      ticks: {
        min: 0,
        steps: 1,
        max: 10,
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }]
  }
}

export { options }
