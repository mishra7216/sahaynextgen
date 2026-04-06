"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Stethoscope, AlertTriangle, Clock, ChevronRight, User } from "lucide-react";

export default function DoctorDashboard() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/queue")
      .then((res) => res.json())
      .then((data) => {
        setQueue(data.queue || []);
        setLoading(false);
      });
  }, []);

  const getPriorityBadge = (level: string) => {
    switch (level) {
      case "EMERGENCY":
        return <span className="px-3 py-1 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle size={12}/> Emergency</span>;
      case "MODERATE":
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider">Moderate</span>;
      default:
        return <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-full text-xs font-bold uppercase tracking-wider">Routine</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Stethoscope className="text-health-500" /> Doctor Portal
            </h1>
            <p className="text-slate-500 mt-1">Live Priority Triage Queue</p>
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Waiting: <span className="text-slate-900 dark:text-white font-bold">{queue.length}</span></span>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800"></div>
            ))}
          </div>
        ) : queue.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No patients in queue</h3>
            <p className="text-slate-500 mt-2">Take a break or review past case files.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {queue.map((session, idx) => (
              <motion.div 
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-health-500 transition-colors group cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getPriorityBadge(session.triageResult?.priorityLevel || "ROUTINE")}
                    <span className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14}/> {Math.floor((new Date().getTime() - new Date(session.createdAt).getTime()) / 60000)} mins waiting</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{session.patient?.fullName || "Unknown Patient"} <span className="text-sm font-normal text-slate-500 ml-2">Age: {session.patient?.age}</span></h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Chief Complaint: {session.symptoms}</p>
                  
                  {/* AI Brief Summary */}
                  {session.triageResult?.summary && (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI Brief:</span> {session.triageResult.summary}
                      </p>
                      {session.triageResult.riskFactors !== "None" && session.triageResult.riskFactors !== "None detected" && (
                        <p className="text-sm text-rose-600 dark:text-rose-400 mt-1">
                          <span className="font-semibold text-rose-700 dark:text-rose-300">Detected Risks:</span> {session.triageResult.riskFactors}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium rounded-xl hover:opacity-90 transition-opacity">
                    Consult Patient <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
