import React, { useEffect, useState } from "react"
import axios from "axios";
import { Form, Modal, Row, Col, Button } from "react-bootstrap";
import YearPicker from "react-year-picker";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import IncomeExpenseChart from "./charts/IncomeExpenseChart";
import CategoryExpenseLineChart from "./charts/CategoryExpenseLineChart";
import CumulativeChart from "./charts/CumulativeChart";
import { useHistory } from 'react-router-dom';

const Trend = () => {
    const animatedComponents = makeAnimated();
    const [responseData, setResponseData] = useState(null)
    const [incomeExpenseData, setIncomeExpenseData] = useState(null)
    const [savingResponse, setSavingResponse] = useState(null)
    const [categoryExpenseData, setCategoryExpenseData] = useState(null)
    const [tagExpenseData, setTagExpenseData] = useState(null)
    

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [timePeriod, setTimePeriod] = useState("MONTHLY")
    const [trendType, setTrendType] = useState("INCOME_EXPENSE")
    
    const [categoryMap, setCategoryMap] = useState(null)
    const [allCategories,setAllCategories] = useState([])
    const [selectedCategories,setSelectedCategories] = useState(["Bills","Transfer","Investment","Shopping","Others","Uncategorized"])
    
    const [fromDateMonth, setFromDateMonth] = useState("Jan")
    const [fromDateYear, setFromDateYear] = useState("2021")
    const [toDateMonth, setToDateMonth] = useState("Jan")
    const [toDateYear, setToDateYear] = useState("2022")

    const [incomeExpenseOption,setIncomeExpenseOption] = useState("NET")
    const [incomeExpenseVisibility,setIncomeExpenseVisibility] = useState("ALL")
    // const [savingOption,setSavingOption] = useState("SAVINGS")
    

    // CONSTANTS
    const timePeriodEnum = ["MONTHLY","QUARTERLY","HALF_YEARLY","YEARLY"]
    const trendTypeEnum = ["INCOME_EXPENSE", "SAVING", "CATEGORY_EXPENSE", "TAG_EXPENSE"]
    const monthNames = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const quarterNames = ['Jan - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Dec']
    const halfYearlyNames = ['Jan - Jun', 'Jul - Dec']
    const fromDateYears = ['2020','2021','2022']
    const toDateYears = ['2020','2021','2022']

    const history = useHistory();

    const createRequestBody = () => {
        let keys = [...categoryMap.keys()]
        return {
            startDate: "2020-10-01T00:00:00.000",
            endDate: "2022-01-31T00:00:00.000",
            timePeriod: timePeriod,
            trendType: trendType,
            categories: keys,
            incomeExpenseOption: incomeExpenseOption,
            // savingOption: savingOption
        }
    }

    useEffect(() => {
        fetching();
    }, []);

    const homeHandler = () => {
        history.push("/")
    }

    const detailPageHandler = () => {
        history.push("/detail")
    }

    const fetching = async () => {
        let myMap = new Map()
        let allCategories = []
        
        // Get all categories
        axios.get("http://localhost:8080/categories").then((categoryResponse) => {
            categoryResponse.data.map((item)=> {
                    myMap.set(item.category, item.rgbColour)
                    allCategories.push({value:item.id, label:item.category})
            });
       });
       
       setCategoryMap(myMap)
       setAllCategories(allCategories)

       // Get Response
       const response = await axios.post("http://localhost:8080/trends", {
            startDate : startDate,
            endDate : endDate,
            timePeriod : timePeriod,
            trendType : trendType,
            categories : []
        }).then((response) => {
            setResponseData(response.data)  
            setIncomeExpenseData(response.data)
        });

    }

    const timePeriodHandler = (event) => {
        setTimePeriod(event.target.value)
    }

    const trendTypeHandler = (event) => {
        setTrendType(event.target.value)
    }

    

    const categorySelectionHandler = (data) => {
        let newCategoryList = []
        data.map(item=>newCategoryList.push(item.label))
        setSelectedCategories(newCategoryList)
    }

    

    const onClickHandler = () => {
        axios.post("http://localhost:8080/trends", createRequestBody()).then((response) => {
            if(trendType==="INCOME_EXPENSE")
                setIncomeExpenseData(response.data)
            else if(trendType==="SAVING")
                setSavingResponse(response.data)
            else if(trendType==="CATEGORY_EXPENSE")
                setCategoryExpenseData(response.data)
            else if(trendType==="TAG_EXPENSE")
                setTagExpenseData(response.data)
        });
    }

    

    const fromDateRender = () => {
        if(timePeriod==="MONTHLY")
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateMonth}>
                            {monthNames.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
        else if(timePeriod==="QUARTERLY")
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateMonth}>
                            {quarterNames.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
        else if(timePeriod==="HALF_YEARLY")
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateMonth}>
                            {halfYearlyNames.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
        else
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
    }

    const toDateRender = () => {
        if(timePeriod==="MONTHLY")
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateMonth}>
                            {monthNames.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
        else if(timePeriod==="QUARTERLY")
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateMonth}>
                            {quarterNames.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
        else if(timePeriod==="HALF_YEARLY")
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateMonth}>
                            {halfYearlyNames.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
        else
            return <>
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={fromDateYear}>
                            {fromDateYears.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>
                </>
    }

    const incomeExpenseVisibilityHandler = () => {
        if(incomeExpenseVisibility==="ALL")
            setIncomeExpenseVisibility("INC")
        else if(incomeExpenseVisibility==="INC")
            setIncomeExpenseVisibility("EXP")
        else 
            setIncomeExpenseVisibility("ALL")
    }

    const additionalInfo = () => {
        if(trendType==='INCOME_EXPENSE')    return <div className="mb-3">
            <Form.Check inline type="radio" label="NET" name="formHorizontalRadios" id="1" checked={incomeExpenseOption==="NET"} onClick={()=>setIncomeExpenseOption("NET")} />
            <Form.Check inline type="radio" label="TOTAL" name="formHorizontalRadios" id="2" checked={incomeExpenseOption==="TOTAL"} onClick={()=>setIncomeExpenseOption("TOTAL")} />
            <Form.Check inline type="radio" label="SAVING" name="formHorizontalRadios" id="3" checked={incomeExpenseOption==="SAVING"} onClick={()=>setIncomeExpenseOption("SAVING")} />
            <Button onClick={incomeExpenseVisibilityHandler}>{incomeExpenseVisibility}</Button>
        </div>
        
        else if(trendType==='SAVING') return <div className="mb-3">
            {/* <Form.Check inline type="radio" label="SAVINGS" name="formHorizontalRadios" id="1" checked={savingOption==="SAVINGS"} onClick={()=>setSavingOption("SAVINGS")} />
            <Form.Check inline type="radio" label="CUMMULATIVE" name="formHorizontalRadios" id="2" checked={savingOption==="CUMM"} onClick={()=>setSavingOption("CUMM")} /> */}
        </div>

        else if(trendType==='CATEGORY_EXPENSE') return <>
                                                        <Row md>
                                                            <Select
                                                                closeMenuOnSelect={false}
                                                                components={animatedComponents}
                                                                isMulti
                                                                placeholder="Tags"
                                                                options={allCategories}
                                                                defaultValue={[allCategories[5],allCategories[3],allCategories[4],allCategories[0],allCategories[2],allCategories[8]]}
                                                                onChange={categorySelectionHandler}
                                                            />
                                                        </Row>
                                                        </>
        else if(trendType==='TAG_EXPENSE') return <></>
    }

    const renderCharts = () => {

        if(trendType==="INCOME_EXPENSE")
            return <IncomeExpenseChart data={incomeExpenseData} option={incomeExpenseOption} visibility={incomeExpenseVisibility}/>
        else if(trendType==="CATEGORY_EXPENSE")
            return <CategoryExpenseLineChart data={categoryExpenseData} option={categoryMap} selectedCategories={selectedCategories}/>
        else if(trendType==="SAVING")
            return <CumulativeChart data={savingResponse}/>

    }

    
    if((trendType==="INCOME_EXPENSE" && incomeExpenseData===null)) {
        return <div>LOADING .......</div>
    } else if((trendType==="CATEGORY_EXPENSE" && categoryExpenseData===null) ) {
        onClickHandler()
        return <div>LOADING .......</div>
    } else if((trendType==="SAVING" && savingResponse===null) ) {
        onClickHandler()
        return <div>LOADING .......</div>
    }
    
    return (
        <>
                {console.log(trendType)}
            <Form>
                <Row className="g-2">
                    {/* TIME PERIOD */}
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={timePeriod} onChange={timePeriodHandler}>
                            {timePeriodEnum.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>

                    {/* FROM DATE */}
                    {fromDateRender()}

                    {/* TO DATE */}
                    {toDateRender()}
                    
                    <Col md>
                        <Form.Select aria-label="Floating label select example" defaultValue={trendType} onChange={trendTypeHandler}>
                            {trendTypeEnum.map(item=><option value={item}>{item}</option>)}
                        </Form.Select>
                    </Col>

                    <Col md>
                        <Button onClick={onClickHandler}> Apply </Button>
                    </Col>
                    
                    <Col md>
                        <Button onClick={homeHandler}> Home </Button>
                        <Button onClick={detailPageHandler}> Detail </Button>
                    </Col>

                    {additionalInfo()}

                </Row>
                            
            </Form>

            {renderCharts()}
            
        </>
    )
}

export default Trend