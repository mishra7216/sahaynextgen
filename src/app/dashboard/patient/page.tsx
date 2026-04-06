"use client";

import { motion } from "framer-motion";
import { User, Activity, FileText, UploadCloud, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 sm:p-10">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Patient Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back! Here is your centralized health overview.</p>
        </div>
        <div className="w-12 h-12 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center font-bold text-lg border-2 border-medical-500">
          JD
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Column - Profile & AI Insights */}
        <div className="space-y-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-16 h-16 bg-medical-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-medical-500">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">John Doe</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">32 years | Male | A+</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Weight</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">75 kg</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Height</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">180 cm</p>
              </div>
              <div className="bg-medical-50 dark:bg-medical-900/20 col-span-2 p-4 rounded-2xl text-center border border-medical-100 dark:border-medical-800">
                <p className="text-xs text-medical-600 dark:text-medical-400 mb-1">Estimated BMI</p>
                <p className="text-xl font-bold text-medical-700 dark:text-medical-300">23.1 <span className="text-sm font-normal">(Normal)</span></p>
              </div>
            </div>
          </motion.div>

          {/* AI Insights Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-6 shadow-sm border border-indigo-100 dark:border-indigo-900/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-indigo-500" />
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200">AI Health Insights</h3>
            </div>
            <p className="text-sm text-indigo-800/70 dark:text-indigo-300 mb-4 leading-relaxed">
              Based on your recent lab reports, your cholesterol levels are slightly elevated. We recommend scheduling a consultation with a Cardiologist.
            </p>
            <button className="w-full py-3 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm">
              Find a Specialist
            </button>
          </motion.div>
        </div>

        {/* Right Columns - Timeline & Uploads */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Document Upload Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="text-slate-400" /> Document Hub
              </h2>
            </div>
            
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 shadow-sm rounded-full flex items-center justify-center text-medical-500 mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={28} />
              </div>
              <p className="text-slate-900 dark:text-white font-medium mb-1">Upload Medical Documents</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                Drag & drop your prescriptions, lab reports, or X-Rays (PDF/JPEG) here. Our AI will automatically analyze them.
              </p>
            </div>
          </motion.div>

          {/* Medical Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
          >
             <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="text-slate-400" /> Medical Timeline
              </h2>
              <button className="text-sm text-medical-600 dark:text-medical-400 font-medium hover:underline">
                View All
              </button>
            </div>

            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-10 pb-4">
              
              {/* Timeline Item 1 */}
              <div className="relative pl-8">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-medical-500 dark:bg-slate-900"></span>
                <div className="text-sm text-slate-500 mb-1 flex items-center gap-2">
                  <Calendar size={14} /> Oct 12, 2025
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Annual General Checkup</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">All vitals normal. Prescribed multi-vitamins.</p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-medical-50 text-medical-700 dark:bg-medical-900/30 dark:text-medical-300 text-xs rounded-full">
                    Dr. Sarah Jenkins (GP)
                  </span>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-slate-300 dark:border-slate-700 dark:bg-slate-900"></span>
                <div className="text-sm text-slate-500 mb-1 flex items-center gap-2">
                  <Calendar size={14} /> Jul 05, 2025
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Dermatology Consultation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Treated mild eczema on left arm. Prescribed Hydrocortisone cream 1%.</p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs rounded-full">
                    Dr. Alan Turing (Dermatologist)
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Navigation aid for prototype */}
      <div className="fixed bottom-6 right-6">
        <Link href="/" className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full shadow-lg text-sm font-medium">
          Home
        </Link>
      </div>
    </div>
  );
}
