import React from "react";
import FormComp from "./FormComp";
import PayoffInfoComp from "./PayoffInfoComp";

class CalculatorComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postedPayments: [],
      minPayment: 1,
      principal: 0,
      paymentsRemaining: 0,
    }
  }


  render() {
    const { principal,minPayment,paymentsRemaining } = this.state;
    return <div>
      <header>
        <h1 className="text-center">Debt Pay Off Calculator</h1>
      </header>
      <FormComp />
      <PayoffInfoComp principal={principal} minPayment={minPayment} paymentsRemaining={paymentsRemaining} />

    </div> 
    
  }
}
export default CalculatorComp;
