"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Stethoscope, ArrowLeft } from "lucide-react";

export default function RoleSelection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          How would you like to use Sahay?
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Choose your role to get started with a personalized experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* Patient Role Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/onboarding/patient" className="block h-full">
            <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-transparent hover:border-medical-500 shadow-sm hover:shadow-xl hover:shadow-medical-500/10 transition-all group flex flex-col items-center text-center cursor-pointer">
              <div className="w-20 h-20 bg-medical-50 dark:bg-medical-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-10 h-10 text-medical-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
                I am a Patient
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Manage your medical history, get AI health insights, and connect with specialized doctors.
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Doctor Role Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/dashboard/doctor" className="block h-full">
            <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-transparent hover:border-health-500 shadow-sm hover:shadow-xl hover:shadow-health-500/10 transition-all group flex flex-col items-center text-center cursor-pointer">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-10 h-10 text-health-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
                I am a Doctor
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                View patient records (with consent), simplify your consultations, and manage appointments.
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
