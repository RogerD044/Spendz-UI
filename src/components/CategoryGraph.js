import React,{  } from "react"
import {Doughnut} from 'react-chartjs-2'

const CategoryGraph = (props) => {
    const categories = props.categories
    const categoryData = categories.filter(item=>item.amount>0).map(item=>item.amount)
    const categoryLabel = categories.filter(item=>item.amount>0).map(item=>item.categoryName)
    const categoryColors = categories.filter(item=>item.amount>0).map(item=>"rgb"+item.color)
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