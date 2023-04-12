import React from "react";
import DisplayPaymentsComp from "./DisplayPaymentsComp";

class FormComp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      postedPayments: [],
      minPayment: 1,
      principal: 0,
      principalMinPay: 0,
      interestPay: 0,
      payment: 0,
      interestRate: 0,
    };
  }

  handleInput = ({ target }) => {
    this.setState({ [target.id]: target.value });
    this.calcMinimum();
  };

  calcMinimum = () => {
    const { principal, interestRate } = this.state;
    let minPay,
      interestPayment = 0,
      principalPayment = 0;
    if (principal > 100) {
      interestPayment = parseFloat((principal * (interestRate / 100 / 12)).toFixed(2));
      principalPayment = parseFloat((principal * 0.01).toFixed(2));
      minPay = parseFloat((principalPayment + interestPayment).toFixed(2));
    } 
    else minPay = parseFloat(principal + principal * 0.01);
    
    this.setState({
      minPayment: minPay.toFixed(2),
      principalMinPay: principalPayment.toFixed(2),
      interestPay: interestPayment.toFixed(2),
    });
  };

  calculateNewBalance = (payment) => {
    const { principal, interestPay } = this.state;
    const amountPaidToPrincipal = payment - interestPay;
    const newPrincipal = principal - amountPaidToPrincipal;
    this.setState({
      principal: newPrincipal.toFixed(2),
    });
  };

  calculatePayment = () => {
    const { minPayment, payment, interestPay } = this.state;
    const newPayment = payment > minPayment ? payment - interestPay : payment;
    this.setState({
      payment: newPayment,
    });
  };

  submitPayment = (e) => {
    e.preventDefault();
    this.calculatePayment();
    const { payment } = this.state;
    this.calculateNewBalance(payment);
    this.calcMinimum();
    const newPayment = {
      id: Date.now(),
      
      payment: payment,
    };
    this.setState((state) => ({
      postedPayments: [...state.postedPayments, newPayment],
      payment: 0,
    }));
  };


  render() {
    const { payment, minPayment, principal, interestRate } = this.state;
    return (
      <div className="calcWrapper">
        <form onSubmit={this.submitPayment}>
          <fieldset>
            <label htmlFor="principal"> Total Debt Amount</label>
            <input
              name="principal"
              id="principal"
              type="number"
              className="input"
              value={principal}
              onChange={this.handleInput}
              onBlur={this.handleInput}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="interestRate"> Interest Rate</label>
            <input
              name="interestRate"
              id="interestRate"
              type="text"
              className="input"
              value={interestRate}
              onChange={this.handleInput}
              onBlur={this.handleInput}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="payment">Payment Amount</label>
            <input
              name="payment"
              id="payment"
              type="number"
              className="input"
              value={payment}
              onChange={this.handleInput}
              onFocus={this.handleInput}
            />
            {principal > 0 && interestRate > 0 && (
              <small>
                $ {parseFloat(minPayment).toFixed(2)} is the minimum payment
              </small>
            )}
          </fieldset>
          <input
            disabled={payment < minPayment}
            type={"submit"}
            value={"Calculate Debt"}
          />
        </form>
        <DisplayPaymentsComp payments={this.state.postedPayments} />
      </div>
    );
  }
}
export default FormComp;
