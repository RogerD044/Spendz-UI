import React from "react"
import "../style/CategorySpendCard.css"
import image from "../assets/img.png"
import renderImage from "../utils/CategoryIconImageRenderUtil"
import parseAmount from "../utils/AmountParserUtil"

const CategorySpendCard = (props) => {

    const amt=props.amount
    const categorySpendInfo=props.info
    const noSpends=props.noOfSpends
    const categoryName = props.info

    return (
        <div className="CategorySpendCard" onClick={()=>props.categoryClickHandler(categorySpendInfo)}>
            <img src={renderImage(categoryName)} className="iconDetails"></img>
            <p className="CategorySpendInfo">{categorySpendInfo}</p>
            {amt<0 ? <p className="CategorySpendAmtCredit">{parseAmount(Math.abs(amt))}</p> : <p className="CategorySpendAmt">{parseAmount(amt)}</p>}
            <p className="NoOfSpends">{noSpends} Spend(s)</p>
        </div>
    )
}

export default CategorySpendCard