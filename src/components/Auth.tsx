import React, { useState } from "react";
import { Sparkles, Loader2, Shield, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import afrimapLogo from "../assets/logo.jpg";

interface AuthProps {
  onLoginSuccess: (token: string, user: any) => void;
}

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isLogin) {
      if (!fullName) {
        setError("Please enter your full name.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const payload = isLogin 
        ? { email, password }
        : { fullName, email, password, confirmPassword };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred during authentication.");
      }

      if (data.token && data.user) {
        localStorage.setItem("invest_token", data.token);
        onLoginSuccess(data.token, data.user);
      } else {
        throw new Error("Invalid session token returned from the server.");
      }
    } catch (err: any) {
      console.error("Authentication failed:", err);
      setError(err.message || "Failed to communicate with the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-500/10 via-emerald-900/5 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in">
        
        {/* Logo and Brand */}
        <div className="text-center space-y-3 mb-8">
          <img 
            src={afrimapLogo} 
            alt="Afrimap Logo" 
            className="h-16 w-16 rounded-2xl mx-auto object-cover border border-slate-800 shadow-xl shadow-emerald-500/10"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://ai.studio/build/favicon.ico";
            }}
          />
          <div>
            <h1 className="text-xl font-black tracking-wider text-slate-100 uppercase">
              AFRI<span className="text-emerald-400">MAP</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Investor Portal</p>
          </div>
          <h2 className="text-base font-bold text-slate-200 mt-2">
            {isLogin ? "Welcome Back, Investor" : "Create Your Investor Account"}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            {isLogin 
              ? "Sign in to access foreign direct investment analytics and AI tools." 
              : "Register as an accredited investor to access feasibility engines."}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/40 border border-red-900/50 rounded-2xl p-4 mb-6 flex items-start gap-3 text-xs text-red-300">
            <Shield className="h-4.5 w-4.5 shrink-0 text-red-500 mt-0.5" />
            <div>
              <span className="font-bold">Authentication Alert</span>
              <p className="mt-0.5 text-slate-400">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Sign Up Only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="E.g., Mariem Derouich"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400" htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
              <input
                id="email"
                type="email"
                placeholder="investor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>
          </div>

          {/* Password Confirmation (Sign Up Only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/10 transition duration-150 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-emerald-200" />
                <span>Processing accreditation...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-emerald-200" />
                <span>{isLogin ? "Authenticate Account" : "Register Credentials"}</span>
              </>
            )}
          </button>
        </form>

        {/* Form Toggle Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
          >
            {isLogin 
              ? "New investor? Create an account instead" 
              : "Already registered? Login to your session"}
          </button>
        </div>

      </div>
    </div>
  );
}
