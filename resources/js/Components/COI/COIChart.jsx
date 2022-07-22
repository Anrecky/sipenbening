import React from 'react'

import {
    Chart as ChartJS,
    LineElement,
    LineController,
    CategoryScale,
    LinearScale,
    TimeScale,
    Legend,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';

class Custom extends LineController {

    initialize() {
        super.initialize.apply(this, arguments)

        var ctx = this.chart.ctx
        var originalStroke = ctx.stroke
        ctx.stroke = function () {
            ctx.save()
            ctx.shadowColor = 'black'
            ctx.shadowBlur = 20
            ctx.shadowOffsetX = 8
            ctx.shadowOffsetY = 14
            originalStroke.apply(this, arguments)
            ctx.restore()
        }
    }

}

Custom.id = 'shadowLine';
Custom.defaults = LineController.defaults;
ChartJS.register(
    LineElement,
    LineController,
    CategoryScale,
    LinearScale,
    TimeScale,
    Legend,
    PointElement,
    Title,
    Tooltip,
    Custom,
)

const tooltipLine = {
    id: 'tooltipLine',
    beforeDraw: chart => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
            const ctx = chart.ctx
            ctx.save()
            const activePoint = chart.tooltip._active[0]
            const color = chart.tooltip.labelColors[0].borderColor

            ctx.beginPath()
            ctx.setLineDash([])
            ctx.moveTo(activePoint.element.x, chart.chartArea.top)
            ctx.lineTo(activePoint.element.x, chart.chartArea.bottom)
            ctx.lineWidth = 4
            ctx.strokeStyle = `${color}`
            ctx.stroke()
            ctx.restore()

        }
    }
}

const fitLegend = {
    beforeInit(chart) {
        const originalFit = chart.legend.fit
        chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)()
            this.height += 25
        }
    }
}


export default function COIChart({ lineData }) {

    const lineChartTimes = [12, 8, 6, 4, 2]

    const onHandleChange = (e) => {
        // fetchLineData(e.target.value)
    }

    const config = {
        options: {
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 20,
                        usePointStyle: true
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 4
                }
            },
            scales: {
                y: {
                    grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: true
                    }
                },
                x: {
                    grid: {
                        drawBorder: false
                    },
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }
            }
        },

        data: {
            datasets: lineData
        }
    }
    return (
        <div className="w-full overflow-hidden shadow-sm sm:rounded-lg h-fit mx-auto my-9 bg-white md:px-10 pb-16 pt-10">
            <div className="flex justify-between mb-5 px-8 md:px-0">
                <h2 className="text-blueGray-700 text-xl font-semibold">
                    Total Benturan Kepentingan
                </h2>

                <label className='hidden'>
                    Pilih Waktu
                </label>
                <select onChange={onHandleChange} defaultValue={12} className='border-0 ring-0 focus:ring-0'>
                    {lineChartTimes.map((value, index) => <option value={value} key={"optionLineChart" + index}>{value} Bulan Terakhir</option>)}
                </select>

            </div>
            <Chart type='shadowLine' plugins={[tooltipLine, fitLegend]} {...config} />
        </div>
    )
}
