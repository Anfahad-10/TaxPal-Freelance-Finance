import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Check your email! We sent you a reset link.");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0F111A]">
      <div className="bg-grain"></div>
      <div className="glow-orb"></div>
      
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="glass-card rounded-[20px] p-8 sm:p-10 w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-purple-500/20 to-transparent border border-purple-400/10 flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="material-symbols-outlined text-purple-300 text-[28px]">lock_reset</span>
              </div>
            </div>
            <h1 className="header-text text-[28px] font-bold text-white mb-3">Forgot Password?</h1>
            <p className="text-slate-400 text-[15px] font-normal leading-relaxed px-2">
              Enter your email and we'll send you a magic link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-slate-400 ml-1 block" htmlFor="email">Email address</label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 pl-11 custom-input rounded-lg text-[15px] placeholder-slate-600 focus:ring-0" 
                  id="email" 
                  type="email"
                  placeholder="you@example.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">mail</span>
              </div>
            </div>
            
            <button 
              className="w-full gradient-btn font-bold py-3.5 rounded-lg mt-2 text-[15px] text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.1)] tracking-tight disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-[14px] font-medium group">
              <span className="material-symbols-outlined mr-1 text-[16px] group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
              Back to Login
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-[12px] font-medium text-slate-600">
          <a className="hover:text-slate-400 transition-colors" href="#">Privacy</a>
          <a className="hover:text-slate-400 transition-colors" href="#">Terms</a>
          <a className="hover:text-slate-400 transition-colors" href="#">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;