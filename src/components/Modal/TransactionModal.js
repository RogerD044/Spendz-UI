import React, { useEffect, useState } from "react"
import axios from "axios";
import { Button, Modal, Form, Row,Col} from 'react-bootstrap';
import { TextField } from "@mui/material";
import {getCategories, getSpendTags} from "../../utils/DetailPageUtil"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../../redux/actions/actions";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const TransactionModal=({transaction, visiblity, closeVisibility})=> {
    var txDate = transaction.txDate
    var rawDesc = transaction.rawDesc
    var amount = transaction.amount
    var outstandingAmt = transaction.balance
    var debit = (transaction.type==='D')?true :false
    var bankName = transaction.bankName
    var paymentVia = "UPI"

    const defaultCategory = transaction.category.id
    const [show, setShow] = useState(visiblity)
    const [displayInfo, setDisplayInfo] = useState(transaction.displayInfo)
    const [excludeFromExpense, setExcludeFromExpense] = useState(transaction.excludeFromExpense)
    const [category, setCategory] = useState(transaction.category.id)
    const [allCategories, setAllCategories] = useState(null)
    const [spendTagIds, setSpendTagIds] = useState(transaction.spendTagIds)
    const [allSpendTags, setAllSpendTags] = useState(null)
    const [categoryChange, setCategoryChange] = useState(false)
    const [allowCategoryChanges, setAllowCategoryChanges] = useState(false)
    let filter = useSelector((state)=> state.filters)

    const animatedComponents = makeAnimated();
    
    const history = useHistory();

    useEffect(() => {
        getCategories(setAllCategories)
        getSpendTags(setAllSpendTags)
    }, []);

    const dispatch = useDispatch();
    
    const handleShow=()=>{
        setShow(true);
    }
    
    const handleClose=()=>{
        setShow(false);
        closeVisibility()

    }

    const expenseHandler=()=>{
        setExcludeFromExpense(!excludeFromExpense)
    }

    const infoChangeHandler=(e)=>{
        setDisplayInfo(e.target.value)
    }

    const saveChanges=()=>{
        setShow(false);
        closeVisibility()
        updateTransaction()
        axios.put("http://localhost:8080/transactions",updateTransaction())
        .then(response=>{
            return axios.post("http://localhost:8080/transactions", filter);
        }).then(response=> {console.log(response.data);
            dispatch(setDetails(response.data))})
        
    }

    const updateTransaction =()=> {
        var updateRequest = {
            "id" : transaction.id,
            "categoryId" : category,
            "excludeFromExpense" : excludeFromExpense,
            "displayInfo" : displayInfo,
            "allowUpcomingCategoryChanges" : allowCategoryChanges,
            "spendTags" : spendTagIds
        }
        return updateRequest
    }

    const changeCategoryHandler=(event)=>{
        if(defaultCategory==event.target.value)
            setCategoryChange(false)
        else 
            setCategoryChange(true)
        setCategory(event.target.value)
    }

    const tagChangeHandler=(selectedOption)=>{
        var selectedSpendTagIds = selectedOption.map(item=>item.value)
        setSpendTagIds(selectedSpendTagIds)
    }

    const upcomingCategoryChangeHandler̉=(event)=>{
        setAllowCategoryChanges(!allowCategoryChanges)
    }

    const getSelectedSpendTags=()=>{
        console.log(spendTagIds)
        console.log(allSpendTags)
        var spendTagArray = []
        spendTagIds.forEach(element => {
            for (var i = 0; i < allSpendTags.length; i++) {
                if(allSpendTags[i].value===element)
                    spendTagArray.push(allSpendTags[i])
            }
        });

        return spendTagArray
    }

    if(allCategories==null || allSpendTags===null)
    return <div>LOADING .......</div>

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{displayInfo}</span>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form>
                        <Form.Floating className="mb-3">
                            <Form.Control id="floatingInputCustom" type="text" defaultValue={displayInfo} onChange={infoChangeHandler} />
                            <label htmlFor="floatingInputCustom">Spend Info</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control as="textarea" defaultValue={rawDesc} placeholder="Leave a comment here" style={{ height: '100px' }} disabled />
                            <label htmlFor="floatingInputCustom">Description</label>
                        </Form.Floating>

                        <Row className="g-2">
                            <Col md>
                                <Form.Floating className="mb-3">
                                    <Form.Control id="floatingInputCustom" type="text" defaultValue={amount} disabled/>
                                    <label htmlFor="floatingInputCustom">Amount</label>
                                </Form.Floating>
                            </Col>
                            <Col md>
                                <Form.Floating className="mb-3">
                                    <Form.Control id="floatingInputCustom" type="text" defaultValue={outstandingAmt} readOnly/>
                                    <label htmlFor="floatingInputCustom">WithStanding</label>
                                </Form.Floating>
                            </Col>
                        </Row>

                        <Row className="g-2">
                            <Col>
                                <Form.Check onClick={expenseHandler} type="switch" id="custom-switch" label="Exclude From Expense" defaultChecked={excludeFromExpense}/>
                            </Col>
                            <Col>
                                <Form.Check type="switch" id="custom-switch" label="Debit" defaultChecked={debit} disabled/>
                            </Col>
                        </Row>

                        <Row className="g-3">
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control id="floatingInputCustom" type="text" defaultValue={bankName}/>
                                    <label htmlFor="floatingInputCustom">Bank</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control id="floatingInputCustom" type="text" defaultValue={paymentVia}/>
                                    <label htmlFor="floatingInputCustom">Payment Via</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control id="floatingInputCustom" type="text" defaultValue={new Date(txDate).toDateString()}/>
                                    <label htmlFor="floatingInputCustom">Spent On</label>
                                </Form.Floating>
                            </Col>
                        </Row>

                        <Form.Floating className="mb-3">
                            <Form.Select aria-label="Floating label select example" defaultValue={category} onChange={changeCategoryHandler}>
                                {
                                    allCategories.map(item =>(<option value={item.id}>{item.category}</option>))
                                }
                            </Form.Select>
                            <label htmlFor="floatingInputCustom">Category</label>
                            {categoryChange ?
                                <Form.Check style={{alignContent:"right"}} onClick={upcomingCategoryChangeHandler̉} type="checkbox" id="custom-switch" label="Allow Changes for Similar Upcoming Transactions" defaultChecked={allowCategoryChanges}/>
                                : null }
                        </Form.Floating>
                                
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Tags"
                            options={allSpendTags}
                            defaultValue={getSelectedSpendTags}
                            onChange={tagChangeHandler}/>
                        

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TransactionModal