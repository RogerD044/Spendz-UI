import React, {useState } from "react"
import { LineChart,Tooltip, Legend,Line,CartesianGrid,XAxis, YAxis, BarChart, Bar,ReferenceLine } from "recharts"
import { Button } from "react-bootstrap";
import parseAmount from '../../../utils/AmountParserUtil'

const mapToData = (data) => {
    const obj = []
    for(var i = 0; i < data.length;i++){
        var categorySpend = data[i].categorySpend
        let dataPt = {total:data[i].totalAmount, name:data[i].label}
        for(const k in categorySpend){
          dataPt[k] = categorySpend[k]
        }
        obj.push(dataPt)
     }
     console.log(obj)
     return obj
}

const mapToDataCummulative = (data,selectedCategories) => {
    console.log(selectedCategories)
    console.log(data)
    const obj = []
    for(var i = 0; i < data.length;i++){
        var categorySpend = data[i].categorySpend
        console.log(categorySpend)
        let dataPt = {total:0, name:data[i].label}
        for (const k in categorySpend) {
            if(selectedCategories.includes(k))
                dataPt['total'] += categorySpend[k]
        }
        obj.push(dataPt)
     }
     console.log(obj)
     return obj
}

const CategoryExpenseLineChart = (props) => {
    const [figType, setFigType] = useState("BAR")
    const [figType2, setFigType2] = useState("CAT")

    const series = []
    props.option.forEach((k,v)=> {
      if(props.selectedCategories.includes(v))
      series.push(v+"#"+k)
    })

    let avgExp = []
    for(const categoryName in props.data.categoryAvgExpense) {
        if(props.selectedCategories.includes(categoryName))
            avgExp.push({category:categoryName, amt:props.data.categoryAvgExpense[categoryName]})
    }
    avgExp = avgExp.sort((a,b)=>(a.amt<b.amt) ? 1 : -1)

    let totalExp = 0
    avgExp.map(it=>totalExp+=it.amt)
    
    const figTypeHandler = () => {
        if(figType==="LINE")
        setFigType("BAR")
        else 
        setFigType("LINE")
    }

    const figType2Handler = () => {
        if(figType2==="CAT")
        setFigType2("TOT")
        else 
        setFigType2("CAT")
    }

    const fetchData = () => {
        if(figType==="LINE" && figType2==="CAT") {
        return <LineChart width={1700} height={820} data={mapToData(props.data.categoryTrendResponse)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {series.map(it=> (<Line type="monotone" dataKey={it.substring(0,it.indexOf('#'))} stroke={'rgb' + it.substring(it.indexOf('#')+1)} strokeWidth={5} dot={{r:7}}/>) )}
                    <ReferenceLine y={totalExp} label={totalExp} stroke="red" strokeWidth={3} strokeDasharray="3 3" />
                </LineChart>
        }
        else if(figType==="LINE" && figType2==="TOT") {
            return <LineChart width={1700} height={820} data={mapToDataCummulative(props.data.categoryTrendResponse,props.selectedCategories)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="orange" strokeWidth={5} dot={{r:7}} />
                        <ReferenceLine y={totalExp} label={totalExp} stroke="red" strokeWidth={3} strokeDasharray="3 3" />
                    </LineChart>
        } 
        else if(figType==="BAR" && figType2==="CAT") {
            return <BarChart width={1700} height={820} data={mapToData(props.data.categoryTrendResponse)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {series.map(it => (<Bar stackId="a" dataKey={it.substring(0, it.indexOf('#'))} fill={'rgb' + it.substring(it.indexOf('#') + 1)} />))}
                        <ReferenceLine y={totalExp} label={totalExp} stroke="red" strokeWidth={3} strokeDasharray="3 3" />
                    </BarChart>
        }
        else {
            return <BarChart width={1700} height={820} data={mapToDataCummulative(props.data.categoryTrendResponse,props.selectedCategories)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="orange" />
                        <ReferenceLine y={totalExp} label={totalExp} stroke="red" strokeWidth={3} strokeDasharray="3 3" />
                    </BarChart>
        }
    }
    return (
        <div>
            {console.log(props)}
            <p>
                <Button variant="danger" onClick={figTypeHandler}>{figType}&ensp;</Button>
                <span>&ensp;</span>
                <Button variant="danger" onClick={figType2Handler}>{figType2}&ensp;</Button>
                <span>&ensp;</span>
                {avgExp.map(it=>(<span>
                                <Button>{it.category} : {parseAmount(it.amt)}</Button>
                                <span>&ensp;</span>
                            </span>))}
            </p>
            
            <p>Avg Total Expense : {totalExp}</p>

            {fetchData()}

            {/* {(figType==="LINE" && figType2==="CAT") ?
                <LineChart width={1700} height={820} data={mapToData(props.data.categoryTrendResponse)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {series.map(it=> (<Line type="monotone" dataKey={it.substring(0,it.indexOf('#'))} stroke={'rgb' + it.substring(it.indexOf('#')+1)} strokeWidth={5} dot={{r:7}}/>) )}
                </LineChart>
            :
                <BarChart width={1700} height={820} data={mapToData(props.data.categoryTrendResponse)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {series.map(it=> (<Bar stackId="a" dataKey={it.substring(0,it.indexOf('#'))} fill={'rgb' + it.substring(it.indexOf('#')+1)} />) )}
                </BarChart>
            } */}
        </div>
    )
}

export default CategoryExpenseLineChart