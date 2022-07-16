const rupeeSign = '\u20B9';

const parseAmount=(amt)=>{
    amt = Math.round(amt)
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

    parsedAmt = rupeeSign + parsedAmt
    return parsedAmt
}

export default parseAmount