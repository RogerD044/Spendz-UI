import React, { useEffect, useState } from "react"
import {getTransactions} from '../utils/DetailPageUtil'
import 'reactjs-popup/dist/index.css';


const Testing=()=> {
    
    const[transaction, setTransactions] = useState(null);
    const[popupVisible, setPopupVisibility] = useState(false);

    useEffect(() => {
        getTransactions(setTransactions)
    }, []);

    const onClickHandler = (data) => {
        setPopupVisibility(!popupVisible)
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(transaction==null) {
        {console.log(transaction)}
        return <div>LOADING .......</div>
    }


    console.log(transaction)

    return (
        <div>
            {/* <AllTransaction transaction={transaction}/>
            <TransactionModal/> */}
        </div>
    )
}
export default Testing
