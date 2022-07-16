import "../style/Main.css"
import SpendCard from "./SpendCard";
import ThisWeekBarGraph from './ThisWeekBarGraph'
import CategorySpendCard from "./CategorySpendCard";
import CircularProgressBar from "./CircularProgressBar";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import parseAmount from '../utils/AmountParserUtil'

const Main = () => {

    let month = (new Date()).toLocaleString('default', { month: 'long' })
    let date = new Date();
    let day = date.getDay()
    let monthNum = date.getMonth()
    let year = date.getFullYear()
    let remainingDays = new Date(year, monthNum+1, 0).getDate() - day
    
    const rupeeSign = '\u20B9';
    const history = useHistory();

    const[details, setDetails] = useState(null)
    const[safeSpendLimit, setSafeSpendLimit] = useState(0)
    const[percentage, setPercentage] = useState(0)
    const[safeSpendRate, setSafeSpendRate] = useState(0)
    const[lastWeekSpent, setLastWeekSpent] = useState(0)
    const[totalSpend, setTotalSpend] = useState(0)


    useEffect(() => {
        initialize()
    }, []);

    const initialize = () => {
        axios.get("http://localhost:8080/landingPage/details").then(response => {
            const res = response.data
            setDetails(res)
            setTotalSpend(res.monthlySpend)
            setSafeSpendLimit(res.spendLimit)
            setPercentage(Math.round(res.monthlySpend/res.spendLimit*100))
            setSafeSpendRate(Math.max(0,Math.round((res.spendLimit - res.monthlySpend)/remainingDays)))
            setLastWeekSpent(res.lastWeekSpend)
        
        })
        .catch(err=>console.log(err))
    }

    const handleClickSpend = () => {
        history.push("/detail");
    }

    if(details==null) {
        return  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
    }
    
    
    return (
        <div className="Main">
            <div className="Budget">
                <div>
                    <p className="Month" >{month}</p>
                    <p onClick={handleClickSpend} className="Spend">{parseAmount(details.monthlySpend)}</p>
                    <div style={{width:400, paddingLeft:"30px"}}>
                        <CircularProgressBar percentage={percentage}/>
                    </div>
                    
                </div>

                <div>
                    <p className="SafeSpend"> 
                        <p style={{textAlign:"center"}}> Last Week Spent</p>
                        <p style={{textAlign:"center",fontSize:"40px",margin:"0"}}>{parseAmount(details.lastWeekSpend)}</p>

                        <br/><br/><br/>
                        <p style={{textAlign:"center",fontSize:"20px"}}>Safe to Spend</p>
                        <p style={{textAlign:"center"}}>
                            <span style={{fontSize:"60px", textAlign:"center"}}>{rupeeSign}{safeSpendRate}</span>
                            <span> per day</span>
                        </p>
                    </p>

                    <br/><br/><br/>

                    <div className="BudgetMsg" style={{textAlign:"center", paddingTop:"20px"}}>
                        {percentage>100
                        ? <span><span>You have overspent </span> <span style={{color:"red", fontWeight:"bold"}}>{parseAmount(totalSpend - safeSpendLimit)}</span></span>
                        : <span><span>You are good to spend </span> <span style={{color:"greenyellow", fontWeight:"bold"}}>{parseAmount(safeSpendLimit - totalSpend)}</span></span>}
                        <span> of your {parseAmount(safeSpendLimit)} budget</span>
                    </div>
                </div>
            </div>
            
            <div className="TopSpend">
                    <p>Top Spends (6)</p>
                    {details.topSixTransactions.map(item=> {return (<SpendCard key={item.id} transaction={item}/>)})}
            </div>

            <div className="TopCategory">
                    <p>Top Categories (6)</p>
                    {details.topSixCategorySpends.map(item=> { return <CategorySpendCard key={item.categoryName} amount={item.amount} info={item.categoryName} noOfSpends={item.noOfSpend}/>})}
            </div>

            <div className="ThisWeek">
                    <p>This Week Spend</p>
                    <ThisWeekBarGraph data={details.lastSevenDaySpends}/>
            </div>
        </div>
    )
}

export default Main