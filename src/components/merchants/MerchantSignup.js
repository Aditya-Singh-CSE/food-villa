import React, { useState } from "react";
import { httpPost } from '../../services/util';

const MerchantSignup = () => {
  const [step, setStep] = useState(1); // 1: form, 2: otp, 3: success
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      setError(err.message || "Could not send OTP");
    } finally {
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
          name: form.name,
          email: form.email,
          password: form.password,
          role: "merchant",
        },
      });
      setStep(3);
    } catch (err) {
      setError(err.message || "OTP verification or signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">
          Merchant Signup
        </h2>
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Business Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg font-bold hover:bg-pink-700 transition">
              Send OTP
            </button>
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
