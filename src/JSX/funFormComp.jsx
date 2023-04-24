import React from "react";
import DisplayPaymentsComp from "./DisplayPaymentsComp";

function FunFormComp(props) {
  const { principal, interestRate,interestPay,payment,minPayment,postedPayments} = props.data;
  const {handleChange,setFormData} =props;

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
    
const calcPaymentsRemaining = () => {
  let paymentsRemaining = 0;
  if(principal < 100 ) {paymentsRemaining = 1 }
  else{
  paymentsRemaining = postedPayments.length === 0? Math.ceil(principal/minPayment):Math.ceil(principal / postedPayments[0].payment);
  }
  setFormData((prevFormData) => ({
    ...prevFormData,
    paymentsRemaining: paymentsRemaining
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
  setFormData((prevFormData) => ({
    ...prevFormData,
    postedPayments: [...postedPayments, newPayment],
    payment: '',
  }));
  calcPaymentsRemaining(newPayment.payment);
};

const inputData = [
  { name: "principal", value: principal,label:"Total Debt Remaining" },
  { name: "interestRate", value: interestRate,label:"Interest Rate"},
  { name: "payment", value: payment,label:"Payment" },
];
            
return (
    <div className="calcWrapper">
        <form onSubmit={submitPayment}>
          {inputData.map((input) => (
            <fieldset key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>
              <input
                name={input.name}
                id={input.name}
                type="text"
                className="input"
                value={input.value}
                onChange={handleChange}
                onBlur={handleChange}
              />
              {(input.name === 'payment'&& (principal > 0 && interestRate > 0)) && (
              <small>
                $ {minPayment} is the minimum payment
              </small>
            )}
            </fieldset>
          ))}
          <input
            disabled={parseFloat(payment) < parseFloat(minPayment)}
            type={"submit"}
            value={"Calculate Debt"}
          />
        </form>
        <DisplayPaymentsComp  payments={postedPayments} />
      </div>
    )

}
export default FunFormComp;