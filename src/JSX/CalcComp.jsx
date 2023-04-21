import React,{useCallback, useEffect,useState} from "react";
import FunFormComp from "./funFormComp";
import PayoffInfoComp from "./PayoffInfoComp";

function CalcComp() {
  const [formData, setFormData] = useState({
    postedPayments: [],
    minPayment: '',
    principal: '',
    principalMinPay: '',
    interestPay: '',
    payment: '',
    interestRate: '',
  });

  const handleFormDataChange =  (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const calcMinimum = useCallback(() => {
    const { principal, interestRate } = formData;
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
  });
  useEffect(() => {
    calcMinimum();
  }, [formData.principal, formData.interestRate]);

  return (
    <div>
      <header>
        <h1 className="text-center">Debt Pay Off Calculator</h1>
      </header>
      <FunFormComp data={formData} handleChange={handleFormDataChange} setFormData={setFormData} />
      {formData.principal > 0 && formData.minPayment > 0 ? (
        <PayoffInfoComp
          principal={formData.principal}
          minPayment={formData.minPayment}
          paymentsRemaining={formData.paymentsRemaining}
        />
      ) : null}
    </div>
  );
}
export default CalcComp;