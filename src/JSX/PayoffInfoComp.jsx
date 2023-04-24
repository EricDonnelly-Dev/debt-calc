import React from "react";

function PayoffInfoComp(props){
const {principal,minPayment,paymentsRemaining} = props;
 const inputData = [
    { name: "principal", value: principal,label:"Total Debt Remaining" },
    { name: "minPayment", value: minPayment,label:"Minimum Payment"},
    { name: "paymentsRemaining", value: paymentsRemaining,label:"Payments Remaining" },
    ];
return (
    <div className="payoffWrapper">
        <h2>Payoff Info</h2>
        {inputData.map((input) => (
            <p key={input.name}> {input.label}: {input.value}</p>
        ))}
    </div>
)
}

export default PayoffInfoComp;