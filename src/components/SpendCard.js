import React, { useState } from "react"
import "../style/SpendCard.css"
import { useHistory } from 'react-router-dom';
import TransactionModal from "./Modal/TransactionModal";
import renderImage from "../utils/CategoryIconImageRenderUtil"
import parseAmount from "../utils/AmountParserUtil"

const SpendCard = (props) => {
    
    const[popupVisible, setPopupVisibility] = useState(false);

    const amt=(props===null) ? 0 :props.transaction.amount
    const name=(props===null) ? 'N/A' : (props.transaction.displayInfo).substring(0,25)
    const info=(props===null) ? 'N/A' : (props.transaction.info).substring(0,25)
    const additionInfo = (props.additionInfo===null) ? '' : props.transaction.additionInfo
    const date = (props.transaction.txDate===null) ? 'N/A' : (new Date(props.transaction.txDate).toDateString().substring(4,18))
    const credit = props.transaction.type==='C'
    const excludedFromExpense =  props.transaction.excludeFromExpense

    const history = useHistory();

    const onClickHandler =()=> {
        setPopupVisibility(!popupVisible)
    }

    const renderStringInfo = (st) => {
        let len = st.length
        return st.substring(0,Math.min(20,len))
    }

    const spendCardComponent = () => {
        return (<>
                    <img src={renderImage(props.transaction.category.category)} className="iconDetails"></img>
                    <p className="SpendInfo">{renderStringInfo(name)}</p>
                    <p className="Date">{date}</p>
                    <p className="AddInfo">{renderStringInfo(info)}</p>
                    {credit ? <p className="SpendAmtCredit">{parseAmount(amt)}</p> : <p className="SpendAmt">{parseAmount(amt)}</p>}
                </>
            )
    }

    return (
        <div>
            {popupVisible ?
            <TransactionModal transaction={props.transaction} visiblity={popupVisible} closeVisibility={onClickHandler}/>
            : null}
            {excludedFromExpense ? 
            <div className="SpendCardExcluded" onClick={onClickHandler}>{spendCardComponent()}</div> : 
            <div className="SpendCard" onClick={onClickHandler}>{spendCardComponent()}</div>
            }
        </div>
    )
}

export default SpendCard