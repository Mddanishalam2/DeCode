// File: src/components/AuthForm.jsx
import React from 'react';

// You can keep these icons here as they are specific to this form
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const AuthForm = ({
  title,
  subtitle,
  formData,
  handleInputChange,
  handleSubmit,
  error,
  buttonText,
  focusRingColor,
  buttonColor,
  children // To allow extra content like "Forgot Password?"
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">{title}</h2>
      <p className="text-gray-600 mb-6 text-center">{subtitle}</p>
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon /></span>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={`w-full p-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${focusRingColor}`}
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon /></span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={`w-full p-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${focusRingColor}`}
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      {children}
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <button
        type="submit"
        className={`w-full text-white p-3 rounded-lg font-semibold transition-colors ${buttonColor}`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;