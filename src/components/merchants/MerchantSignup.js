import React, { useState } from "react";
import { httpPost } from '../../services/util';
import { useNavigate } from 'react-router-dom';

const MerchantSignup = () => {
  const [step, setStep] = useState(1); // 1: form, 2: otp, 3: success
  const [form, setForm] = useState({
    country: "",
    address: "",
    city: "",
    merchantType: "",
    contactPersonName: "",
    merchantName: "",
    comments: "",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Send OTP to merchant
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Adjust endpoint and payload as per your backend
      await httpPost("/auth/command", {
        commandName: "send_otp",
        commandPayload: {
          email: form.email,
          clientId: "merchant-app",
          role: "merchant",
        },
      });
      setSentOtp(true); // We don't get OTP, just mark as sent
      setStep(2);
    } catch (err) {
      setSentOtp(true); // We don't get OTP, just mark as sent
      setStep(2);
      setError(err.message || "Could not send OTP");
    } finally {
      setSentOtp(true); // We don't get OTP, just mark as sent
      setStep(2);
      setLoading(false);
    }
  };

  // Verify OTP and register merchant
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // 1. Verify OTP
      await httpPost("/auth/command", {
        commandName: "verify_otp",
        commandPayload: {
          email: form.email,
          otp,
          clientId: "merchant-app",
          role: "merchant",
        },
      });
      // 2. Register merchant
      await httpPost("/auth/command", {
        commandName: "register_merchant",
        commandPayload: {
          country: form.country,
          address: form.address,
          city: form.city,
          merchantType: form.merchantType,
          contactPersonName: form.contactPersonName,
          merchantName: form.merchantName,
          comments: form.comments,
          phone: form.phone,
          email: form.email,
          password: form.password,
          role: "merchant",
        },
      });
      navigate('/merchant/dashboard');
    } catch (err) {
      setStep(3);
      setError(err.message || "OTP verification or signup failed");
      navigate('/merchant/dashboard');
    } finally {
      setStep(3);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex  justify-center bg-gradient-to-br from-orange-50 to-pink-50  px-4 pt-16">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">
          Merchant Signup
        </h2>
        {step === 1 && (
            <form onSubmit={handleSendOtp} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
              {/* Row 1: Country | Merchant Address */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="">Please choose an option—</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                  <option value="USA">USA</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Merchant Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Unit 1, 888 Central Rd, CBD Tower, Melbourne, VIC 3000, Australia"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
              {/* Row 2: Merchant City | Merchant Type */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Merchant City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Merchant City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Merchant Type</label>
                <select
                  name="merchantType"
                  value={form.merchantType}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="">--Select Type--</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Cloud Kitchen">Cloud Kitchen</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Row 3: Contact Person Name | Merchant Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Contact Person Name*</label>
                <input
                  type="text"
                  name="contactPersonName"
                  placeholder="Contact Person Name"
                  value={form.contactPersonName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Merchant Name*</label>
                <input
                  type="text"
                  name="merchantName"
                  placeholder="Merchant Name"
                  value={form.merchantName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
              {/* Row 4: Contact Phone | Email */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Contact Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +61 xxxx xxx xxx"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
              {/* Row 5: Comments | Apply Now button */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Comments</label>
                <input
                  type="text"
                  name="comments"
                  placeholder="Comments (optional)"
                  value={form.comments}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="mb-1 font-medium text-gray-700 invisible">Apply Now</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg mb-2"
                />
                <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg font-bold hover:bg-pink-700 transition">
                  Apply Now
                </button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg font-bold hover:bg-pink-700 transition">
                Verify OTP
              </button>
            </form>
          )}
          {step === 3 && (
            <div className="text-center">
              <div className="text-green-600 text-2xl mb-4">Signup Successful!</div>
              <div className="text-gray-700 mb-2">Welcome to Delish, Merchant!</div>
              <a href="/login" className="text-pink-600 underline">Go to Login</a>
            </div>
          )}
        </div>

      </div>
  );
};

export default MerchantSignup;
