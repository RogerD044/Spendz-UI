import React from "react"
import {Bar} from 'react-chartjs-2'
import "../style/Main.css"

const ThisWeekBarGraph = (props) => {
    const dataMap = props.data
    const dayMap = Object.keys(dataMap).map(item=>new Date(item).toDateString())
    const amtMap = Object.values(dataMap)
    console.log(dayMap)
    console.log(amtMap)

    const data = {
    labels: dayMap,
    datasets: [{
        // label: 'This Week Spend',
        data: amtMap,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
        ],
        borderWidth: 1
        
    }]
    };

    const options= {
      hover: {
        animationDuration: 0
      },
      plugins : {
        datalabels: {
          display: true,
          color: "white"
        },
        legend: {
          display: false  // Hides Label on the Dataset
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      chartArea: {
          backgroundColor: "white"
      },
      scales:{
        y: {
          grid: {display :false},
          ticks: {
            color: "white",
            font:{
              size:18
            }
          }
        },
        x: {
          grid: {display :false},
          ticks: {
            color: "white",
            font:{
              size:18
            }
          }
        }
      }
    };

    return (
        <div class="barcanvas">
            <Bar 
            data={data}
            options={options}
            />
        </div>
    )
}

export default ThisWeekBarGraph