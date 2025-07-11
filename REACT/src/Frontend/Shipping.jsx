import React, { useState } from "react";

const ShippingForm = ({ onChange }) => {
  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    onChange({ ...address, [e.target.name]: e.target.value }); // Pass to parent
  };

  return (
    <div className="mt-8 p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-lg font-bold">Shipping Address</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full border p-2" />
      <input name="address" placeholder="Address" onChange={handleChange} className="w-full border p-2" />
      <input name="city" placeholder="City" onChange={handleChange} className="w-full border p-2" />
      <input name="state" placeholder="State" onChange={handleChange} className="w-full border p-2" />
      <input name="postalCode" placeholder="Postal Code" onChange={handleChange} className="w-full border p-2" />
      <input name="country" placeholder="Country" onChange={handleChange} className="w-full border p-2" />
    </div>
  );
};

export default ShippingForm;
