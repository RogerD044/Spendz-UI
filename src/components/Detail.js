import React, { useEffect, useState } from "react"
import CategoryGraph from "./CategoryGraph"
import "../style/Detail.css"
import Button from "@mui/material/Button"
import { Card } from "@mui/material"
import CategorySpendCard from "./CategorySpendCard";
import ReactPaginate from 'react-paginate';
import {getCategory, getTransactions} from '../utils/DetailPageUtil'
import AllTransaction from "./AllTransactions"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../redux/actions/actions";
import DetailFilterModal from "./Modal/DetailFilterModal"
import parseAmount from '../utils/AmountParserUtil'
import { useHistory } from 'react-router-dom';

const Detail = () => {

    const history = useHistory();
    const pageSize=10
    const[categorySpend, setcategorySpend] = useState(null);
    const[transaction, setTransactions] = useState(null);
    let data = useSelector((state) => state.detailPageData.data);
    const categorySpendTotal=60
    const totalCategorySpendPages=categorySpendTotal/pageSize 
    const dispatch = useDispatch();
    const [filterVisible, setFilterVisible] = useState(false)
    let filter = useSelector((state)=> state.filters)
    const [currCategoryPage, setCurrCategoryPage] = useState(0)
    
    useEffect(() => {
        fetching();
    }, [filter]);

    const fetching = async () => {
        const response = await axios.post("http://localhost:8080/transactions", filter).catch((err) => {
            console.log("Err: ", err);
        });
        dispatch(setDetails(response.data));
        setTransactions(response.data)
    };

    const categoryPageClick = (data) => {
        let currPage = data.selected
        setCurrCategoryPage(currPage)
        const categories = getCategory(currPage,pageSize)
        setcategorySpend(categories)
    }

    const transactionPageClick = (data) => {
        let currPage = data.selected
        const transactions = getTransactions()
        console.log(transactions.then((response)=>response.data))
        setTransactions(transactions)
    }

    const toggleFilter = () => {
        setFilterVisible(!filterVisible)
    }

    const homeHandler = () => {
        history.push("/")
    }

    const trendsPageHandler = () => {
        history.push("/trends")
    }

    const calcPercentage = (num, den) => {
        return Math.round((num/den)*100)
    }

    var dateFlag=false
    var from="17 Aug'21"
    var to="19 Sep'21"
    var month="Sep'21"

    var spend=1000
    var income=1000
    
    const buttonStyle = {
        marginTop:'10%',
        marginDown:'10%',
        marginLeft:'7%',
        maxWidth:'25%',
        minWidth: '25%',
        maxHeight: '10%',
        minHeight: '10%'
    }
    
    if(transaction==null || filter==null || data==null) {
        return <div>LOADING .......</div>
    }
    
    return (
        <div className="Background">
            <div className="CategoryGraph">
                <CategoryGraph categories={data.categoryWiseResponseData}/>
            </div>
            {console.log(filter)}
            <div className="Misc">
                {filterVisible ? <DetailFilterModal visibility={filterVisible} setVisibility={setFilterVisible}/> : null}
                <Button style={buttonStyle} size="small" variant="outlined" onClick={homeHandler}>Home</Button>
                <Button style={buttonStyle} size="large" variant="outlined" onClick={toggleFilter}>Filter</Button>
                <Button style={buttonStyle} size="large" variant="outlined" onClick={trendsPageHandler}>Trends</Button>
                
                {/* {dateFlag ? (
                    <p style={{paddingTop:60, textAlign:"center", fontSize:80, paddingBottom:50}}>{month}</p>    
                ) : (
                    <><p style={{paddingTop:20,margin:0, textAlign:"center", fontSize: 50 }}>{new Date(filter.startDate).toDateString()}</p><p style={{margin:0, textAlign:"center",fontSize: 50 }}>to</p><p style={{margin:0, textAlign:"center",fontSize: 50 }}>{new Date(filter.endDate).toDateString()}</p></>
                )} */}
                {console.log(data)}
                <Card style={{marginLeft:30, marginTop:40, backgroundColor:'rgba(54, 162, 235, 0.15)', width:360, height:175, color:'white', borderColor:'rgb(54, 162, 235)'}}>
                    <p style={{textAlign:"center", fontSize:20, marginDown:0}}>Total Spend</p>
                    <p style={{paddingTop:10,margin:0,paddingBottom:20, fontSize:70, textAlign:"center"}}>{parseAmount(data.totalSpend)}</p>
                </Card>

                <Card style={{marginLeft:30, marginTop:20, backgroundColor:'rgba(255, 138, 101, 0.15)', width:360, height:175, color:'white', borderColor:'rgb(54, 162, 235)'}}>
                    <p style={{textAlign:"center", fontSize:20, marginDown:0}}>Net Spend ({calcPercentage(data.totalSpend - data.miscIncome - data.investment, data.totalIncome - data.miscIncome)}%)</p>
                    <p style={{paddingTop:10,margin:0,paddingBottom:20, fontSize:70, textAlign:"center"}}>{parseAmount(data.totalSpend - data.miscIncome - data.investment)}</p>
                </Card>

                <Card style={{marginLeft:30, marginTop:20, backgroundColor:'rgba(188, 108, 202, 0.15)', width:360, height:175, color:'white', borderColor:'rgb(75, 192, 192)'}}>
                    <p style={{textAlign:"center", fontSize:20, marginDown:0}}>Saving & Investment ({calcPercentage(data.investment + (data.totalIncome-data.totalSpend), data.totalIncome - data.miscIncome)}%)</p>
                    <p style={{paddingTop:10,margin:0,paddingBottom:20, fontSize:70, textAlign:"center"}}>{parseAmount(data.investment + (data.totalIncome-data.totalSpend))}</p>
                </Card>

                <Card style={{marginLeft:30, marginTop:20, backgroundColor:'rgba(75, 192, 192, 0.15)', width:360, height:175, color:'white', borderColor:'rgb(75, 192, 192)'}}>
                    <p style={{textAlign:"center", fontSize:20, marginDown:0}}>Total Income</p>
                    <p style={{paddingTop:10,margin:0,paddingBottom:20, fontSize:70, textAlign:"center"}}>{parseAmount(data.totalIncome)}</p>
                </Card>
            </div>
            
            
            <div className="Category">
                <p style={{textAlign:"center"}}>
                    <span>{data.categoryWiseResponseData.map(item => item.noOfSpend).reduce((prev, next) => prev + next,0)}</span>
                    <span> Category Spends</span>
                </p>

                <ReactPaginate 
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(transaction.categoryWiseResponseData.length/pageSize)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={categoryPageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
                {data.categoryWiseResponseData.slice(currCategoryPage * pageSize,currCategoryPage * pageSize + pageSize).map((item) => {
                    return <CategorySpendCard key={item.categoryName} amount={item.amount} info={item.categoryName} noOfSpends={item.noOfSpend}/>    
                })}
            </div>

            <div className="Transaction">
                <AllTransaction transactions={transaction.allTransactions}/>
            </div>

            <div className="CategoryGraph">
                {dateFlag ? (
                    <p style={{paddingTop:60, textAlign:"center", fontSize:80, paddingBottom:50}}>{month}</p>    
                ) : (
                    <><p style={{paddingTop:20,margin:0, textAlign:"center", fontSize: 50 }}>{new Date(filter.startDate).toDateString()}</p><p style={{margin:0, textAlign:"center",fontSize: 50 }}>to</p><p style={{margin:0, textAlign:"center",fontSize: 50 }}>{new Date(filter.endDate).toDateString()}</p></>
                )}
                <br/>
                <ul style={{textAlign:"center"}}>
                    {data.categoryWiseResponseData.sort((a,b)=> (a.percentile < b.percentile ? 1 : -1)).map(item=> <li key={item.categoryName}>{item.categoryName} - {item.percentile.toFixed(1)}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Detail