import React from "react";

function PayoffInfoComp(props){
const {principal,minPayment,paymentsRemaining} = props;

return (
    <div className="payoffWrapper">
        <h2>Payoff Info</h2>
        <p>Principal: ${principal}</p>
        <p>Minimum Payment: ${minPayment}</p>
        <p>Payments Remaining: {paymentsRemaining}</p>
    </div>
)
}

export default PayoffInfoComp;