// File: src/pages/Auth.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService'; // Correct import
import AuthForm from '../components/AuthForm'; // Correct import

// GoogleIcon can stay or be moved to a shared icon component file
const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.22-11.303-7.583l-6.571 4.819A20 20 0 0 0 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.697 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

function Auth() {
  const [activePanel, setActivePanel] = useState('signup');
  const [signupData, setSignupData] = useState({ username: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'signup') {
      setSignupData(prev => ({ ...prev, [name]: value }));
    } else {
      setLoginData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');
    try {
      authService.signup(signupData.username, signupData.password);
      navigate('/app');
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      authService.login(loginData.username, loginData.password);
      navigate('/app');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const panelClass = "w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 transition-all duration-700 ease-in-out";
  const activeClass = "transform scale-100 opacity-100 z-10";
  const inactiveClass = "transform lg:scale-95 opacity-80 z-0";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full items-center justify-center gap-8 lg:gap-0 p-4 bg-gray-100">
      {/* Signup Panel */}
      <div
        className={`${panelClass} ${activePanel === 'signup' ? activeClass : inactiveClass} lg:border-r lg:border-gray-500`}
        onClick={() => setActivePanel('signup')}
      >
        <div className="w-full max-w-md bg-white transition-all duration-300 border border-gray-200 rounded-2xl p-8 shadow-xl hover:scale-105 hover:shadow-indigo-500/20">
          <AuthForm
            title="Create Account"
            subtitle="Join our platform DeCode"
            formData={signupData}
            handleInputChange={(e) => handleInputChange(e, 'signup')}
            handleSubmit={handleSignupSubmit}
            error={signupError}
            buttonText="Sign Up"
            focusRingColor="focus:ring-indigo-500"
            buttonColor="bg-indigo-600 hover:bg-indigo-700"
          />
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">Or sign up with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center"><button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><GoogleIcon /></button></div>
        </div>
      </div>

      {/* Login Panel */}
      <div
        className={`${panelClass} ${activePanel === 'login' ? activeClass : inactiveClass}`}
        onClick={() => setActivePanel('login')}
      >
        <div className="w-full max-w-md bg-white transition-all duration-300 border border-gray-200 rounded-2xl p-8 shadow-xl hover:scale-105 hover:shadow-teal-500/20">
          <AuthForm
            title="Welcome Back!"
            subtitle="Log in to continue your journey."
            formData={loginData}
            handleInputChange={(e) => handleInputChange(e, 'login')}
            handleSubmit={handleLoginSubmit}
            error={loginError}
            buttonText="Login"
            focusRingColor="focus:ring-teal-500"
            buttonColor="bg-teal-600 hover:bg-teal-700"
          >
            <div className="text-right mb-4">
              <a href="#" className="text-sm text-teal-600 hover:underline">Forgot Password?</a>
            </div>
          </AuthForm>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">Or log in with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center"><button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><GoogleIcon /></button></div>
        </div>
      </div>
    </div>
  );
}

export default Auth;