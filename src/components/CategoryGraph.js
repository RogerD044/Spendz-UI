import React,{  } from "react"
import {Doughnut} from 'react-chartjs-2'

const CategoryGraph = (props) => {
    const categories = props.categories
    const categoryData = categories.map(item=>item.amount)
    const categoryLabel = categories.map(item=>item.categoryName)
    const categoryColors = categories.map(item=>"rgb"+item.color)
    console.log(categoryData)
    console.log(categoryLabel)
    console.log(categoryColors)
    const data = {
        labels: categoryLabel,
        datasets: [{
          label: 'My First Dataset',
          data: categoryData,
          backgroundColor: categoryColors,
          hoverOffset: 35,
        }]
      };

    const options= {
      animation : {
        animateScale:true
      },
      plugins : {
        legend: {
          display: false  // Hides Label on the Dataset
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 20
      }
    };

    return (
        <div className="chartcanvas">
            <Doughnut 
            data={data}
            options={options}
            />
        </div>
    )
}

export default CategoryGraph