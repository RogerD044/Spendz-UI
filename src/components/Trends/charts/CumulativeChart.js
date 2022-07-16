import React from "react"
import { BarChart,Tooltip, Legend,Bar,CartesianGrid,XAxis, YAxis } from "recharts"

const mapToData = (data) => {
    const obj = []
    data.map(it=> obj.push({name:it.label, Balance:it.amount}))
    console.log(obj)
    return obj
}

const CumulativeChart = (props) => {
    return (
        <div>
            <BarChart width={1700} height={900} data={mapToData(props.data.savings)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Balance" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}

export default CumulativeChart