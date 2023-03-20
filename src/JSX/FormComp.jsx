import React from "react";

class FormComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleInput = ({ target }) => {
    const inputValue = [target.name].includes("interestRate")
      ? target.value / 100
      : target.value;
    this.setState({ [target.id]: parseFloat(inputValue) });
    this.calcMinimum();
  };
  calcMinimum = () => {
    const { principal, interestRate } = this.state;
    let minPay, interestPayment, principalPayment;
    if (principal > 100) {
      interestPayment = parseInt((principal * (interestRate / 12)).toFixed(2));
      principalPayment = parseInt((principal * 0.01).toFixed(2));
      minPay = parseInt((principalPayment + interestPayment).toFixed(0));
    } else {
      minPay = principal;
    }
    this.setState({
      minPayment: minPay,
      principalMinPay: principalPayment,
      interestPay: interestPayment,
    });
  };
  calculateNewBalance = (payment) => {
    const { principal, interestPay } = this.state;
    const amountPaidToPrincipal = payment - interestPay;
    const newPrincipal = principal - amountPaidToPrincipal;
    this.setState({
      principal: newPrincipal,
    });
  };
  calculatePayment = () => {
    const { minPayment, extraPayment } = this.state;
    const newPayment = minPayment + extraPayment;
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
    }));
  };
  render() {
    return (
      <form onSubmit={this.submitPayment}>
        <fieldset>
          <label htmlFor="principal"> Total Debt Amount</label>
          <input
            name="principal"
            id="principal"
            type="number"
            onChange={this.handleInput}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="interestRate"> Interest Rate</label>
          <input
            name="interestRate"
            id="interestRate"
            type="text"
            onChange={this.handleInput}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="extraPayment"> Additional Payment Amount</label>
          <input
            name="extraPayment"
            id="extraPayment"
            type="number"
            onChange={this.handleInput}
          />
        </fieldset>
        <input type={"submit"} value={"Calculate Debt"} />
      </form>
    );
  }
}
export default FormComp;
