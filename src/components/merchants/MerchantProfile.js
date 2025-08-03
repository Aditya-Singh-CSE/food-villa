import React, { useState } from "react";
import { useMerchant } from "../../context/MerchantContext";
import "./MerchantProfile.css";

const MerchantProfile = () => {
  const { merchantProfile, setMerchantProfile } = useMerchant();
  const [form, setForm] = useState(merchantProfile);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMerchantProfile(form);
    setEditing(false);
  };

  return (
    <div className="merchant-profile">
      <h2>Merchant Profile</h2>
      {!editing ? (
        <div className="profile-view">
          <div><b>Name:</b> {merchantProfile.name || "N/A"}</div>
          <div><b>Email:</b> {merchantProfile.email || "N/A"}</div>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default MerchantProfile;
