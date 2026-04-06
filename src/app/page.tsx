"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, Activity, Users, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md fixed top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-8 h-8 text-medical-500" />
          <span className="text-xl font-bold text-medical-900 dark:text-white">
            Sahay NextGen
          </span>
        </div>
        <div className="flex gap-4">
          <Link
            href="/role-selection"
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-medical-600 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/role-selection"
            className="px-4 py-2 text-sm font-medium bg-medical-500 text-white rounded-lg hover:bg-medical-600 transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-medical-500"></span>
              </span>
              Next-generation patient care
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8">
              Your Health Journey, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-500 to-health-500">
                Securely Centralized
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience a unified platform where patients have complete control over their medical history, and doctors deliver data-driven care. Powered by Advanced AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/role-selection"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-medical-500 text-white rounded-xl hover:bg-medical-600 transition-all shadow-lg shadow-medical-500/30 hover:shadow-medical-500/50 hover:-translate-y-0.5"
              >
                Join the Platform
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl"
        >
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-4">
              <ShieldCheck className="w-6 h-6 text-medical-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Absolute Privacy</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Your data is encrypted. You grant explicit access to doctors you trust.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl mb-4">
              <Activity className="w-6 h-6 text-health-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Health Insights</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Upload past lab reports and let AI generate actionable risk indicators.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl mb-4">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Seamless Care</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Connect instantly with specialized doctors based on your unique history.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
