import React,{useState,useEffect,useCallback} from "react";
import DisplayPaymentsComp from "./DisplayPaymentsComp";

function FunFormComp(props) {
  const { principal, interestRate,interestPay,payment,minPayment,postedPayments} = props.data;
  const {handleChange} =props;

// TODO: This is just a filler function until I implement it properly
const setFormData = ((prevFormData) => ({  
  ...prevFormData,
  principal: principal,
  interestRate: interestRate,
  interestPay: interestPay,
  payment: payment,
  minPayment: minPayment,
  postedPayments: postedPayments,
}));

  const calculateNewBalance = 
  (payment) => {
    const amountPaidToPrincipal = payment - interestPay;
    const newPrincipal = principal - amountPaidToPrincipal;
    setFormData((prevFormData) => ({
      ...prevFormData,
      principal: newPrincipal.toFixed(2),
    }));
  }

const calculatePayment = () => {
  
  const newPayment =
    payment > minPayment ? payment - interestPay : payment;
  setFormData((prevFormData) => ({
    ...prevFormData,
    payment: newPayment,
  })); 
};
    
const submitPayment = (e) => {
  e.preventDefault();
  const newPayment = {
    id: Date.now(),
    payment: payment,
  };
  calculatePayment();
  calculateNewBalance(payment);
  handleChange((prevFormData) => ({
    ...prevFormData,
    postedPayments: [...postedPayments, newPayment],
    payment: 0,
  }));
};
          
          
return (
    <div className="calcWrapper">
        <form onSubmit={submitPayment}>
          <fieldset>
            <label htmlFor="principal"> Total Debt Amount</label>
            <input
              name="principal"
              id="principal"
              type="number"
              className="input"
              value={principal}
              onChange={handleChange}
              onBlur={handleChange}
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
              onChange={handleChange}
              onBlur={handleChange}
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
              onChange={handleChange}
              onBlur={handleChange}
            />
            {principal > 0 && interestRate > 0 && (
              <small>
                $ {minPayment} is the minimum payment
              </small>
            )}
          </fieldset>
          <input
            disabled={payment < minPayment}
            type={"submit"}
            value={"Calculate Debt"}
          />
        </form>
        <DisplayPaymentsComp payments={postedPayments} />
      </div>
    )

}
export default FunFormComp;