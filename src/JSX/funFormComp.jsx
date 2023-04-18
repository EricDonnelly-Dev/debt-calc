import React,{useState,useEffect,useCallback} from "react";
import DisplayPaymentsComp from "./DisplayPaymentsComp";

function FunFormComp(props) {
    const { onFormDataChange } = props;
  
    const [funFormData, setFormData] = useState({
      postedPayments: [],
      minPayment: 1,
      principal: 0,
      principalMinPay: 0,
      interestPay: 0,
      payment: 0,
      interestRate: 0,
    });
  
    const handleFormChange = useCallback(
      (event) => {
        const { name, value } = event.target;
  
        // Update form data
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
  
        // Recalculate minimum payment
        const calcMinimum = () => {
          const { principal, interestRate } = funFormData;
          let minPay,
            interestPayment = 0,
            principalPayment = 0;
          if (principal > 100) {
            interestPayment = parseFloat(
              (principal * (interestRate / 100 / 12)).toFixed(2)
            );
            principalPayment = parseFloat((principal * 0.01).toFixed(2));
            minPay = parseFloat(
              (principalPayment + interestPayment).toFixed(2)
            );
          } else minPay = parseFloat(principal + principal * 0.01);
  
          // Update form data with minimum payment
          setFormData((prevFormData) => ({
            ...prevFormData,
            minPayment: minPay.toFixed(2),
            principalMinPay: principalPayment.toFixed(2),
            interestPay: interestPayment.toFixed(2),
          }));
        };
        calcMinimum();
  
        // Notify parent component of form data change
        onFormDataChange({ [name]: value });
      },
      [funFormData, onFormDataChange]
    );
  
    const calculateNewBalance = useCallback(
      (payment) => {
        const { principal, interestPay } = funFormData;
        const amountPaidToPrincipal = payment - interestPay;
        const newPrincipal = principal - amountPaidToPrincipal;
        setFormData((prevFormData) => ({
          ...prevFormData,
          principal: newPrincipal.toFixed(2),
        }));
        onFormDataChange({ principal: newPrincipal.toFixed(2) });
      },
      [funFormData, onFormDataChange]
    );
  
    const calculatePayment = useCallback(() => {
      const { minPayment, payment, interestPay } = funFormData;
      const newPayment =
        payment > minPayment ? payment - interestPay : payment;
      setFormData((prevFormData) => ({
        ...prevFormData,
        payment: newPayment,
      }));
      onFormDataChange({ payment: newPayment });
    }, [funFormData, onFormDataChange]);
  
    const submitPayment = useCallback(
        (e) => {
          e.preventDefault();
          const { postedPayments, payment, minPayment } = funFormData;
          const newPayment = {
            id: Date.now(),
            payment: payment,
          };
          setFormData((prevFormData) => ({
            ...prevFormData,
            postedPayments: [...postedPayments, newPayment],
            payment: 0,
          }));
          onFormDataChange({
            postedPayments: [...postedPayments, newPayment],
            minPayment: minPayment,
          });
          calculatePayment();
          calculateNewBalance(payment);
        },
        [funFormData, calculatePayment, calculateNewBalance, onFormDataChange]
      );
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
              value={funFormData.principal}
              onChange={handleFormChange}
              onBlur={handleFormChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="interestRate"> Interest Rate</label>
            <input
              name="interestRate"
              id="interestRate"
              type="text"
              className="input"
              value={funFormData.interestRate}
              onChange={handleFormChange}
              onBlur={handleFormChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="payment">Payment Amount</label>
            <input
              name="payment"
              id="payment"
              type="number"
              className="input"
              value={funFormData.payment}
              onChange={handleFormChange}
              onBlur={handleFormChange}
            />
            {funFormData.principal > 0 && funFormData.interestRate > 0 && (
              <small>
                $ {parseFloat(funFormData.minPayment).toFixed(2)} is the minimum payment
              </small>
            )}
          </fieldset>
          <input
            disabled={funFormData.payment < funFormData.minPayment}
            type={"submit"}
            value={"Calculate Debt"}
          />
        </form>
        <DisplayPaymentsComp payments={funFormData.postedPayments} />
      </div>
    )

}
export default FunFormComp;