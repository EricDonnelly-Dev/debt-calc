import React, { useState } from 'react';

function ChildComponent(props) {
  const [formData, setFormData] = 
  useState({ name: "", email: "", phone: "" });

  function handleFormChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    props.onFormDataChange(formData);
  }

  return (
    <div>
      <input type="text" name="name" 
      value={formData.name} 
      onChange={handleFormChange} 
      onBlur={handleFormChange} />
      <input type="text" name="email" 
      value={formData.email} 
      onChange={handleFormChange} onBlur={handleFormChange} />
      <input type="text" name="phone" 
      value={formData.phone} 
      onChange={handleFormChange} onBlur={handleFormChange} />
    </div>
  );
}
export default ChildComponent;