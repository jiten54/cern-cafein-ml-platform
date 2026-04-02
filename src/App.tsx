/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Shield, ArrowRight, Lock, Globe, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Simple Button component since I might have issues with shadcn button import in this block
const CustomButton = ({ children, onClick, className, variant = 'primary' }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
      variant === 'primary' 
        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20' 
        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
    } ${className}`}
  >
    {children}
  </button>
);

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Animated glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-blue-600/20"
          >
            <Activity size={40} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">CAFEIN</h1>
          <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest">CERN ML Platform v2.4</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-600/5 border border-blue-600/20">
              <Shield className="text-blue-500" size={24} />
              <div>
                <p className="text-sm font-medium">CERN Single Sign-On</p>
                <p className="text-xs text-zinc-500">Secure authentication required</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Account</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-300 font-mono text-sm">
                    monijiten4@gmail.com
                  </div>
                </div>
              </div>
            </div>

            <CustomButton 
              onClick={handleLogin} 
              className="w-full py-4"
              isLoading={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate with CERN SSO
                  <ArrowRight size={18} />
                </>
              )}
            </CustomButton>

            <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest">
              Authorized Personnel Only • Geneva, Switzerland
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <Globe size={20} className="mx-auto text-zinc-700" />
            <p className="text-[10px] text-zinc-500 font-medium">Global Network</p>
          </div>
          <div className="text-center space-y-2">
            <Cpu size={20} className="mx-auto text-zinc-700" />
            <p className="text-[10px] text-zinc-500 font-medium">HPC Cluster</p>
          </div>
          <div className="text-center space-y-2">
            <Activity size={20} className="mx-auto text-zinc-700" />
            <p className="text-[10px] text-zinc-500 font-medium">Real-time ML</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isLoggedIn ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-screen"
        >
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

