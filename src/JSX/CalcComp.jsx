import React,{useCallback, useEffect,useState,useRef} from "react";
import FunFormComp from "./funFormComp";
import PayoffInfoComp from "./PayoffInfoComp";

function CalcComp() {
  const [formData, setFormData] = useState({
    principal: 0,
    minPayment: 0,
    paymentsRemaining: 0,
    postedPayments: []
  });

  const handleFormDataChange = useCallback(
    (newFormData) => {
      setFormData((prevFormData) => ({ ...prevFormData, ...newFormData }));
    },
    [setFormData]
  );

  const calcPaymentsRemaining = useCallback(() => {
    const { principal, minPayment } = formData;
    const paymentsRemaining = Math.ceil(principal / minPayment);
    handleFormDataChange((prevFormData) => ({
      ...prevFormData,
      paymentsRemaining: paymentsRemaining
    }));
  }, [formData,handleFormDataChange]);

  const hasCalculatedPaymentsRemaining = useRef(false);

  useEffect(() => {
    if (!hasCalculatedPaymentsRemaining.current) {
      calcPaymentsRemaining();
      hasCalculatedPaymentsRemaining.current = true;
    }
  }, [formData, calcPaymentsRemaining]);

  useEffect(() => {
    hasCalculatedPaymentsRemaining.current = false;
  });

  return (
    <div>
      <header>
        <h1 className="text-center">Debt Pay Off Calculator</h1>
      </header>
      <FunFormComp onFormDataChange={handleFormDataChange} />
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