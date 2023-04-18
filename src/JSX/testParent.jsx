import React, { useEffect, useState } from 'react';
import ChildComponent from './testChild';

function ParentComponent() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  function handleFormDataChange(newFormData) {
    setFormData(newFormData);
  }
  useEffect(() => {
    console.log(formData);
    }, [formData]);

  return (
    <div>
      <p>Current data:</p>
      <ul>
        <li>Name: {formData.name}</li>
        <li>Email: {formData.email}</li>
        <li>Phone: {formData.phone}</li>
      </ul>
      <ChildComponent onFormDataChange={handleFormDataChange} />
    </div>
  );
}
export default ParentComponent;