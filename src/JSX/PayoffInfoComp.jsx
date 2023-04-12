import React from "react";

class PayoffInfoComp extends React.Component {
render() {  
return (
    <div className="payoffWrapper">
        <h2>Payoff Info</h2>
        <p>Minimum Payment: ${this.props.minPayment}</p>
        <p>Principal: ${this.props.principal}</p>
        <p>Payments Remaining: ${this.props.paymentsRemaining}</p>
    </div>
)
    }
}

export default PayoffInfoComp;