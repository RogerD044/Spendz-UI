import React, { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import SpendCard from "./SpendCard";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button"

const AllTransaction = () => {
    let transactions = useSelector((state) => state.detailPageData.data.allTransactions);
    const[props, setProps] = useState(null)
    const pageSize = 9;
    const [totalTransactions, setTotalTransactions] = useState(0)
    const [currentTransactions, setCurrentTransactions] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [amtOrderByAsc, setAmtOrderByAsc] = useState(false)
    const [dateOrderByAsc, setDateOrderByAsc] = useState(false)
    
    // -1 : DESC , 0 : No order(Default), 1: ASC
    const [orderByAmountState, setOrderByAmountState] = useState(0)
    const [orderByDateState, setOrderByDateState] = useState(-1)

    useEffect(() => {
        setProps(transactions)
        setCurrentTransactions(getCurrentTransactions(currentPage))
        setTotalTransactions(transactions.length)
        sortByDateImplementation(orderByDateState)
        sortByAmountImplementation(orderByAmountState)
    }, [transactions]);

    function getCurrentTransactions(currPage) {
        let start = currPage * pageSize
        return transactions.slice(start,start+pageSize)
    }

    const onPaginationClick = (data) => {
        let currPage = data.selected
        setCurrentPage(currPage)
        setCurrentTransactions(getCurrentTransactions(currPage))
    }

    const sortByDateImplementation = (orderByDateState) => {
        if(orderByDateState===0) return
        
        // DESC
        if(orderByDateState===-1)
            transactions = transactions.sort((a,b) => {
                let da = new Date(a.txDate), db = new Date(b.txDate);
                return db-da;
            });
        else 
            transactions = transactions.sort((a,b) => {
                let da = new Date(a.txDate), db = new Date(b.txDate);
                return da-db;
            });
        setCurrentPage(currentPage)
        setCurrentTransactions(getCurrentTransactions(currentPage))
    }

    const sortByDateHandler = () => {
        let newState
        if(orderByDateState===0)
            newState = -1
        else if(orderByDateState===1)
            newState = -1
        else if(orderByDateState===-1)
            newState = 1

        sortByDateImplementation(newState)
        setOrderByDateState(newState)

        setOrderByAmountState(0)
    }

    const sortByAmountImplementation = (orderByAmountState) => {
        if(orderByAmountState===0) return

        if(orderByAmountState===1)
            transactions = transactions.sort((a,b) => {
                return a.amount - b.amount;
            });
        else
            transactions = transactions.sort((a,b) => {
                return b.amount - a.amount;
            });

        setCurrentPage(currentPage)
        setCurrentTransactions(getCurrentTransactions(currentPage))
    }

    const sortByAmountHandler = () => {
        let newState
        if(orderByAmountState===0)
            newState = -1
        else if(orderByAmountState===1)
            newState = -1
        else if(orderByAmountState===-1)
            newState = 1

        sortByAmountImplementation(newState)
        setOrderByAmountState(newState)

        setOrderByDateState(0)
    }

    // const sortByAmountHandler = () => {
    //     if(amtOrderByAsc)
    //         transactions = transactions.sort((a,b) => {
    //             return a.amount - b.amount;
    //         });
    //     else
    //         transactions = transactions.sort((a,b) => {
    //             return b.amount - a.amount;
    //         });
    //     setCurrentPage(0)
    //     setCurrentTransactions(getCurrentTransactions(0))

    //     setAmtOrderByAsc(!amtOrderByAsc)
    // }
    
    if(props==null || currentTransactions==null) {
        return <div>LOADING .......</div>
    }

    return (
        <div>
            <p style={{textAlign:"center"}}>
                    <span>{transactions.length}</span>
                    <span> Transactions</span>
                    <span> ({transactions.filter(item => !item.excludeFromExpense).length} active)</span>
                </p>
            <ReactPaginate 
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalTransactions/pageSize}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={onPaginationClick}
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
            
            <p>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                <Button size="small" variant="outlined" color="error" onClick={sortByAmountHandler}>{(orderByAmountState===-1) ? (<span>Amount ⬇</span>) : ((orderByAmountState===1) ? <span>Amount ⬆</span> : <span>Amount</span>)}</Button>
                
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                
                <Button size="small" variant="outlined" color="error" onClick={sortByDateHandler}>{(orderByDateState===-1) ? (<span>Date ⬇</span>) : ((orderByDateState===1) ? <span>Date ⬆</span> : <span>Date</span>)}</Button>
            </p>
            
            {
                currentTransactions.map(item => {
                return (<SpendCard key={item.id} transaction={item}/>)})
            }
        </div>
                
    )

}

export default AllTransaction