import Chart from 'chart.js'
import { options } from '../teams/chart_options.js'

export class ChartCreator {
  constructor({ ctx, options, datasets }) {
    this.datasets = datasets
    this.options = options
    this.ctx = ctx
  }

  addDataset(dataset) {
    this.datasets.push(dataset)
    this.drawChart()
  }

  drawChart() {
    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: this.datasets 
      },
      options: this.options
    })
  }
}
