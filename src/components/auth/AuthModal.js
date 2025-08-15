import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail } from 'react-icons/fi';
import { httpPost } from '../../services/util';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ── 1.  SEND OTP (sign-up, first step) ──
    if (isSignup && enableEmailVerification && !showOtpField) {
      setIsLoading(true);
      try {
        await httpPost("/auth/command", {
          commandName: "send_otp",
          commandPayload: { email: formData.email, clientId: "note-app" },
        });
        setShowOtpField(true);
      } catch (err) {
        alert(err.message || "Could not send OTP");
      } finally {
        setIsLoading(false);
      }
      return;
    }
  
    // ── 2.  LOGIN or VERIFY OTP (second step) ──
    setIsLoading(true);
    try {
      const payload = isSignup
        ? {
            commandName: "sign_up",
            commandPayload: {
              email: formData.email,
              password: formData.password,
              role: "user",
              otp: formData.otp,
              clientId: "note-app",
            },
          }
        : {
            command: "login_entity",
            data: {
              email: formData.email,
              password: formData.password,
              clientId: "foodVilla",
            },
          };
  
      const data = await httpPost("", payload);

  
      const result = await login({
        token: data?.data?.token,
        email: formData.email,
        role: data?.data?.user?.role || "anonymous",
      });
  
      if (result.success) {
        onSuccess?.(data);
        onClose();

        // console.log("result:",result)
        // console.log("data:",data)

        const role = data?.data?.user?.role
        console.log("Current Role:",role)
        if (role === "merchant"){
          console.log("Redirect to Merchant dashboard")
          navigate('/merchant/dashboard')
        } else if (role === "customer"){
          console.log("Redirect to Customer dashboard")
        }
      }
    } catch (err) {
      alert(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // For signup, show email verification first if enabled
  //   if (isSignup && enableEmailVerification && !showOtpField) {
  //     setIsLoading(true);
  //     // Simulate API call to send verification email
  //     setTimeout(() => {
  //       setShowOtpField(true);
  //       setIsLoading(false);
  //     }, 1000);
  //     return;
  //   }
    
  //   // For login or after OTP verification
  //   setIsLoading(true);
    
  //   try {
  //     // Prepare the request payload
  //     const payload = {
  //       commandName: 'login',
  //       commandPayload: {
  //         email: formData.email,
  //         password: formData.password,
  //         clientId: 'note-app'
  //       }
  //     };

  //     // Make the API call
  //     const response = await fetch('https://bright-coyote-385507.de.r.appspot.com/sendmessage', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const responseData = await response.json();
      
  //     if (!response.ok) {
  //       throw new Error(responseData.message || 'Login failed');
  //     }

  //     // Login using AuthContext which will handle token storage
  //     if (responseData.token) {
  //       // Extract user role from the response
  //       // This assumes your API returns the role in the response
  //       // If not, you'll need to adjust this part
  //       const userRole = responseData.role || 'user'; // Default to 'user' if role not provided
        
  //       const result = await login({
  //         token: responseData.token,
  //         email: formData.email,
  //         role: userRole
  //       });
        
  //       if (result.success) {
  //         if (onSuccess) {
  //           onSuccess(responseData);
  //         }
          
  //         // Redirect based on role
  //         if (userRole === 'student') {
  //           // Redirect to student dashboard
  //           window.location.href = '/dashboard';
  //         } else {
  //           // Redirect to home or another appropriate page for non-student users
  //           window.location.href = '/';
  //         }
          
  //         onClose();
  //       } else {
  //         throw new Error(result.error || 'Authentication failed');
  //       }
  //     } else {
  //       throw new Error('No token received from server');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     alert(error.message || 'An error occurred during login');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
