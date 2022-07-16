import uncategorized from "../assets/Uncategorized.png"
import investment from "../assets/Investment.png"
import shopping from "../assets/Shopping.png"
import others from "../assets/Others.png"
import transfer from "../assets/Transfer.png"
import travel from "../assets/Travel.png"
import entertainment from "../assets/Entertainment.png"
import fnd from "../assets/Food&Drink.png"
import bills from "../assets/Bills.png"
import grocery from "../assets/Grocery.png"
import health from "../assets/Health.png"
import salary from "../assets/Salary.png"


const renderImage = (category) => {
    switch(category) {
        case("Uncategorized") : return uncategorized
        case("Shopping") : return shopping
        case("Investment") : return investment
        case("Others") : return others
        case("Transfer") : return transfer
        case("Travel") : return travel
        case("Entertainment") : return entertainment
        case("Food & Drinks") : return fnd
        case("Bills") : return bills
        case("Grocery") : return grocery
        case("Health") : return health
        case("Salary") : return salary
        default : return uncategorized
    }
}

export default renderImage