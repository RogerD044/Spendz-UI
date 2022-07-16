import axios from "axios";

const allTransactionUrls = "http://localhost:8080/transactions"
const allCategoryUrl = "http://localhost:8080/categories"
const allSpendTagUrl = "http://localhost:8080/spendTags"
var startDate = new Date()
var endDate = new Date()

const categorySpends = {
    body : [
        {info:"category1", amount:10000, noOfSpends:11},
        {info:"category241", amount:10000, noOfSpends:11},
        {info:"category251", amount:10000, noOfSpends:11}],
    total: 40
    } 

function setDefaultDateRange() {
    var startDate = new Date()
    var endDate = new Date()
    startDate.setHours(0,0,0,0)
    endDate.setHours(0,0,0,0)

    startDate.setDate(1)
    endDate.setDate(1)
    // endDate.setMonth(endDate.getMonth()+1)

    
    // TO BE REMOVED
    startDate.setMonth(7)
    endDate.setMonth(8)

    return {startDate, endDate}
}

function getTransactions (setTransactions) {
    axios.post("http://localhost:8080/transactions", {
            startDate : "2021-08-01T00:00:00.0000",
            endDate: "2021-09-01T00:00:00.0000"
    }).then((response) => {
        setTransactions(response.data)  
    });
}

function getCategories (setAllCategories) {
    axios.get(allCategoryUrl).then((response) => {
        setAllCategories(response.data)  
    });
}

function getSpendTags (setAllSpendTag) {
    axios.get(allSpendTagUrl).then((response) => {
        setAllSpendTag(response.data)
    });
}

function getCategory(currPage,pageSize) {
    let start = currPage * pageSize
    return categorySpends.body.slice(start,start+pageSize)
}

export {getCategory, getTransactions, setDefaultDateRange, getCategories, getSpendTags}