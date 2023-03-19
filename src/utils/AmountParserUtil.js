const rupeeSign = '\u20B9';

const parseAmount=(amt)=>{
    var actualAmtWithSign = Math.round(amt)
    amt = Math.abs(actualAmtWithSign)
    var amountSign = (actualAmtWithSign>0) ? '' :'-' 
    var parsedAmt = ''
    var count = 0
    while(amt!=0) {
        var ld = amt%10
        parsedAmt = ld + parsedAmt
        count = count + 1

        amt = ~~(amt/10);
        
        if(count%2==1 && count!=1 && amt!=0)
            parsedAmt = ',' + parsedAmt
    }
    
    parsedAmt = rupeeSign + amountSign + parsedAmt
    return parsedAmt
}

export default parseAmount