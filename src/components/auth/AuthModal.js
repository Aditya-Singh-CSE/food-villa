import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail } from 'react-icons/fi';
import Modal from '../common/Modal';

const AuthModal = ({ isOpen, onClose, type = 'login', onSuccess, enableEmailVerification = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = type === 'signup';
  const title = isSignup ? 'Sign up' : 'Login';
  const showEmailVerification = isSignup && showOtpField && enableEmailVerification;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset form state when modal is closed or type changes
  useEffect(() => {
    if (!isOpen) {
      setShowOtpField(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        otp: ''
      });
      setIsLoading(false);
      setShowPassword(false);
    }
  }, [isOpen, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For signup, show email verification first if enabled
    if (isSignup && enableEmailVerification && !showOtpField) {
      setIsLoading(true);
      // Simulate API call to send verification email
      setTimeout(() => {
        setShowOtpField(true);
        setIsLoading(false);
      }, 1000);
      return;
    }
    
    // For login or after OTP verification
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSuccess();
      onClose();
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleAuth = async () => {
    // Set Google-specific loading state
    setIsGoogleLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      onSuccess();
      onClose();
      setIsGoogleLoading(false);
    }, 1000);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && !showOtpField && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>
        )}
        
        {!showEmailVerification ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isSignup ? 'Create Password' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder={isSignup ? "Create a password" : "Enter your password"}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Sign In')}
            </button>
          </div>
      ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter 6-digit OTP sent to {formData.email}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setFormData(prev => ({ ...prev, otp: value }));
                }}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 text-center text-lg tracking-widest"
                placeholder="_ _ _ _ _ _"
                maxLength={6}
                inputMode="numeric"
                pattern="\d*"
                autoComplete="one-time-code"
                autoFocus
                disabled={isLoading}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Didn't receive OTP?{' '}
              <button
                type="button"
                onClick={() => {
                  // Resend OTP logic here
                  setFormData(prev => ({ ...prev, otp: '' }));
                }}
                className="text-pink-600 hover:text-pink-700 font-medium"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </p>
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setShowOtpField(false)}
                className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                disabled={isLoading}
              >
                Change email
              </button>
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 px-6 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                disabled={isLoading || formData.otp.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </div>
        )}
      </form>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        {renderForm()}

        {(!showOtpField || !isSignup) && (
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
              disabled={isLoading || isGoogleLoading}
            >
              <FcGoogle className="w-5 h-5" />
              {isGoogleLoading ? 'Signing in with Google...' : 'Continue with Google'}
            </button>
          </div>
        )}

        <div className="text-center text-sm mt-4">
            {isSignup ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    // You can open login modal here if needed
                  }}
                  className="text-pink-600 hover:text-pink-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    // You can open signup modal here if needed
                  }}
                  className="text-pink-600 hover:text-pink-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Sign up
                </button>
              </p>
            )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
