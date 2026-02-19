import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Grab token from URL
  const navigate = useNavigate();
  
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwords.new }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password Reset Successful!");
        navigate('/login');
      } else {
        alert(data.message || "Token invalid or expired.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0F111A]">
      <div className="bg-grain"></div>
      <div className="glow-orb"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        
        {/* Toast Notification Animation */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full max-w-sm flex items-center gap-3 bg-[#131620] border border-green-500/20 rounded-lg p-3 shadow-lg backdrop-blur-md animate-toast pointer-events-none z-50">
          <div className="bg-green-500/10 rounded-full p-1.5 flex-shrink-0">
            <span className="material-symbols-outlined text-[#10B981] text-[18px]">check_circle</span>
          </div>
          <div>
            <p className="text-white text-[13px] font-medium">Magic link verified</p>
            <p className="text-slate-400 text-[11px]">You can now set your new password.</p>
          </div>
        </div>

        <div className="glass-card rounded-[20px] p-8 sm:p-10 w-full mt-10">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-transparent border border-blue-400/10 flex items-center justify-center shadow-lg backdrop-blur-sm relative group">
                <span className="material-symbols-outlined text-blue-400 text-3xl group-hover:scale-110 transition-transform duration-300">lock_reset</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#131620]"></div>
              </div>
            </div>
            <h1 className="header-text text-[28px] font-bold text-white mb-2">Create New Password</h1>
            <p className="text-slate-400 text-[15px] font-normal leading-relaxed max-w-[280px] mx-auto">
              Your new password must be different from previous passwords.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-slate-400 ml-1 block" htmlFor="new-password">New Password</label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 custom-input rounded-lg text-[15px] placeholder-slate-600 focus:ring-0 pr-10" 
                  id="new-password" 
                  name="new"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters" 
                  required
                  value={passwords.new}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
              
              {/* Strength Meter Visuals */}
              <div className="flex gap-1 h-1 mt-2 px-1">
                <div className={`w-1/4 rounded-full transition-all ${passwords.new.length > 0 ? 'bg-red-500' : 'bg-slate-700'}`}></div>
                <div className={`w-1/4 rounded-full transition-all ${passwords.new.length > 5 ? 'bg-yellow-500' : 'bg-slate-700'}`}></div>
                <div className={`w-1/4 rounded-full transition-all ${passwords.new.length > 8 ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                <div className={`w-1/4 rounded-full transition-all ${passwords.new.length > 10 ? 'bg-green-400' : 'bg-slate-700'}`}></div>
              </div>
              <div className="px-1 pt-1 flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Password Strength</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-medium text-slate-400 ml-1 block" htmlFor="confirm-password">Confirm New Password</label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 custom-input rounded-lg text-[15px] placeholder-slate-600 focus:ring-0 pr-10" 
                  id="confirm-password" 
                  name="confirm"
                  type="password"
                  placeholder="Re-enter password" 
                  required
                  value={passwords.confirm}
                  onChange={handleChange}
                />
                {passwords.confirm && passwords.new === passwords.confirm && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                )}
              </div>
            </div>

            <button className="w-full gradient-btn font-bold py-3.5 rounded-lg mt-8 text-[15px] text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.1)] tracking-tight flex items-center justify-center gap-2 group" type="submit" disabled={loading}>
              <span>{loading ? "Updating..." : "Change Password"}</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-slate-500 text-[14px] hover:text-white transition-colors flex items-center justify-center gap-2 group">
              <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Back to login
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-[12px] font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;