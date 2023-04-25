import React from "react"
import { BarChart,Tooltip, Legend,Bar,CartesianGrid,XAxis, YAxis,ReferenceLine } from "recharts"

let avgExp = 0
let avgSav = 0

const mapData = (rawData,option) => {
    let data = []
    if(option==="NET")
        rawData.incomeExpenseResponse.map(item => {
            data.push({name:item.label, Income:(item.fixedIncome + item.passiveIncome), Expense:(item.totalSpend - item.miscIncome)})
            avgExp += (item.totalSpend - item.miscIncome)
        })
    else if(option==="TOTAL")
        rawData.incomeExpenseResponse.map(item => {
            data.push({name:item.label, Income:(item.fixedIncome + item.passiveIncome + item.miscIncome), Expense:item.totalSpend})
            avgExp += (item.totalSpend)
        })
    else
        rawData.incomeExpenseResponse.map(item => {
            data.push({name:item.label, Saving:Math.max((item.fixedIncome + item.passiveIncome + item.miscIncome - item.totalSpend),0)})
            avgSav += (item.fixedIncome + item.passiveIncome + item.miscIncome - item.totalSpend)
        })
    
    avgExp = avgExp/rawData.incomeExpenseResponse.length
    avgSav = avgSav/rawData.incomeExpenseResponse.length
    return data
}

const IncomeExpenseChart = (props) => {
    console.log(props)
    let visibility = props.visibility
    return (
        <div>
            <>
                {(props.option!=="SAVING") ? <p>Average Expense : {avgExp}</p> : <p>Average Savings : {avgSav}</p>}
            </>
            <BarChart width={1700} height={850} data={mapData(props.data, props.option)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {((props.option==="NET" || props.option==="TOTAL") && visibility!=="EXP") ? <Bar dataKey="Income" fill="#82ca9d" /> : null}
                {((props.option==="NET" || props.option==="TOTAL") && visibility!=="INC") ? <Bar dataKey="Expense" fill="#df7f7d"/> : null}
                {(props.option==="SAVING") ? <Bar dataKey="Saving" fill="#FF6347"/> : null}
                
                {((props.option==="NET" || props.option==="TOTAL") && visibility!=="INC") ? <ReferenceLine y={avgExp} label="Avergae Expense" stroke="black" strokeDasharray="3 3" /> : null}
                {(props.option==="SAVING") ? <ReferenceLine y={avgSav} label="Avergae Saving" stroke="red" strokeDasharray="3 3" /> : null}
            </BarChart>
        </div>
    )
}

export default IncomeExpenseChart