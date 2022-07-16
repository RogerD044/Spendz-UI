import React, { useEffect, useState } from "react"
import { Button, Modal, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/actions/actions";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const DetailFilterModal = ({visibility, setVisibility}) => {
    const dispatch = useDispatch();
    let filter = useSelector((state)=> state.filters)
    console.log(filter)
    const [selectByMonth, setSelectByMonth] = useState(filter.dateType==1)
    const [selectByLastMonth, setSelectByLastMonth] = useState(filter.dateType==2)
    const [selectCustomDate, setSelectCustomDate] = useState(filter.dateType==3)
    const [fromDate, setFromDate] = useState(new Date(filter.startDate))
    const [toDate, setToDate] = useState(new Date(filter.endDate))
    const [filterByMonthCurrValue, setFilterByMonthValue] = useState(filter.filterByMonthValue)
    const [filterByLastMonthCurrValue, setFilterByLastMonthValue] = useState(filter.filterByLastMonthValue)
    const [currDateType, setDateType] = useState(filter.filterByLastMonthValue)

    const lastVisibleMonths = 15
    const monthNames = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const selectByMonthMap =  new Map()
    let currentDate = new Date()
    currentDate.setDate(1)
    for (let i=0; i<lastVisibleMonths; i++) {
        selectByMonthMap.set((monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear()), new Date(currentDate.getTime()))
        currentDate.setMonth(currentDate.getMonth() - 1);
    }

    const handleClose = () => {
        setVisibility(false);
    }

    const saveChanges=()=> {
        setVisibility(false);
        dispatch(setFilters(
            {
                startDate:new Date(fromDate.setHours(0,0,0,0)),
                endDate:new Date(toDate.setHours(23,59,59,999)),
                dateType:currDateType,
                filterByMonthValue:filterByMonthCurrValue,
                filterByLastMonthValue:filterByLastMonthCurrValue
            }
        ))   
    }

    function onClickDateFilter(type){
        setSelectByMonth(false)
        setSelectByLastMonth(false)
        setSelectCustomDate(false)
        if(type==="3") {
            setSelectCustomDate(true)
        } else if(type==="2") {
            setSelectByLastMonth(true)
            setLastMonthDates(1)
        } else {
            setSelectByMonth(true)
            setMonthlyDates(selectByMonthMap.keys().next().value)
        }
    }

    const selectByMonthHandler=(event)=>{
        let key = event.target.value
        setMonthlyDates(key)
        setDateType(1)
        console.log(typeof(Array.from(selectByMonthMap.keys())).indexOf(key))
        setFilterByMonthValue((Array.from(selectByMonthMap.keys())).indexOf(key))
    }

    function setMonthlyDates(key) {
        let tempFromDate = new Date(selectByMonthMap.get(key).getTime())
        setFromDate(tempFromDate)
        setToDate(new Date(tempFromDate.getFullYear(), tempFromDate.getMonth()+1, 0))
    }

    const selectByLastMonthHandler=(event)=>{
        let key = event.target.value
        setLastMonthDates(key)
        setDateType(2)
        setFilterByLastMonthValue(key)
    }

    function setLastMonthDates(key) {
        setToDate(new Date())
        
        if(key===0) {
            setFromDate(new Date(cd.getTime()))
        }
        
        let cd = new Date()
        cd.setDate(1)
        for (let i=0; i<key; i++) {
            cd.setMonth(cd.getMonth() - 1)
        }
        setFromDate(new Date(cd.getTime()))
    }

    const toDateChangeHandler=(date)=>{
        setToDate(date)
        setDateType(3)
    }
    
    const fromDateChangeHandler=(date)=>{
        setFromDate(date)
        setDateType(3)
    }
    
    return (
        <div>
            <Modal show={visibility} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Filters</span>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form>
                        <div className="mb-3">
                            <Form.Check inline type="radio" label="By Month" name="formHorizontalRadios" id="1" checked={selectByMonth} onClick={()=>onClickDateFilter("1")} />
                            <Form.Check inline type="radio" label="By Last Months" name="formHorizontalRadios" id="2" checked={selectByLastMonth} onClick={()=>onClickDateFilter("2")} />
                            <Form.Check inline type="radio" label="Custom Date" name="formHorizontalRadios" id="3" checked={selectCustomDate} onClick={()=>onClickDateFilter("3")} />
                        </div>
                        
                        {selectByMonth ? 
                            <Form.Select aria-label="Floating label select example" defaultValue={Array.from(selectByMonthMap.keys())[filterByMonthCurrValue]} onChange={selectByMonthHandler}>
                                {Array.from(selectByMonthMap.keys()).map((item)=><option value={item}>{item}</option>)}
                            </Form.Select> : null}
                        
                        {selectByLastMonth ? 
                            <Form.Select aria-label="Floating label select example" defaultValue={filterByLastMonthCurrValue} onChange={selectByLastMonthHandler}>
                                {Array.from({length: lastVisibleMonths}, (_, i) => i + 1).map((item)=><option value={item}>{item} Month(s)</option>)}
                                <option value={0}>Inception</option>
                            </Form.Select> : null}
                        
                        <br/>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker label="From" format="dd/MM/yyyy" value={fromDate} disabled={!selectCustomDate} onChange={fromDateChangeHandler}/>
                            <KeyboardDatePicker label="From" format="dd/MM/yyyy" value={toDate} disabled={!selectCustomDate} onChange={toDateChangeHandler}/>
                        </MuiPickersUtilsProvider>


                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={saveChanges}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DetailFilterModal;