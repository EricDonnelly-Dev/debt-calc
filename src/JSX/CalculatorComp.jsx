import React from "react";
import FormComp from "./FormComp";
import DisplayPaymentsComp from "./DisplayPaymentsComp";

class CalculatorComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      principal: this.props.principal,
      interestRate: this.props.interestRate,
      minPayment: this.props.minPayment,
      postedPayments: [],
    };
  }
  render() {
    return (
      <div className="inputSection">
        <FormComp />
        <DisplayPaymentsComp />
      </div>
    );
  }
}
export default CalculatorComp;
