"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldAlert, Activity, FileText, CheckCircle2, Users, Clock, ArrowRight, UserPlus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

function PatientDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("sessionId");

  const [session, setSession] = useState<any | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Fetch session and doctors in parallel
    Promise.all([
      fetch(`/api/triage/session?id=${sessionId}`).then(res => res.json()),
      fetch(`/api/doctors`).then(res => res.json())
    ]).then(([sessionData, doctorsData]) => {
      if (sessionData.session) setSession(sessionData.session);
      if (doctorsData.doctors) setDoctors(doctorsData.doctors);
      setLoading(false);
    });
  }, [sessionId]);

  const handleAssign = async () => {
    if (!selectedDoctorId || !sessionId) return;
    setAssigning(true);
    try {
      const res = await fetch("/api/triage/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, doctorId: selectedDoctorId })
      });
      if (res.ok) {
        // Refresh session
        const updated = await fetch(`/api/triage/session?id=${sessionId}`).then(r => r.json());
        setSession(updated.session);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-10 flex justify-center items-center">
        <div className="animate-pulse text-indigo-500 font-medium text-lg">Loading your health hub...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-10 flex flex-col justify-center items-center text-center">
        <ShieldAlert className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Active Triage Session Found</h1>
        <p className="text-slate-500 mb-6">Please complete your patient profile to begin.</p>
        <button onClick={() => router.push("/onboarding/patient")} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium">Start Onboarding</button>
      </div>
    );
  }

  const p = session.patient;
  const r = session.triageResult;
  const isAssigned = !!session.doctorId;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Patient Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, {p.fullName}!</p>
        </div>
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg border border-indigo-200">
          {p.fullName.charAt(0)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        
        {/* Left Column - AI Report Card */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="text-indigo-500" /> Your Health Summary
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className={`p-4 rounded-2xl mb-6 ${r?.priorityLevel === 'EMERGENCY' ? 'bg-rose-50 text-rose-800' : r?.priorityLevel === 'MODERATE' ? 'bg-amber-50 text-amber-800' : 'bg-slate-50 text-slate-800'} dark:bg-opacity-10`}>
              <h3 className="font-bold mb-1 flex items-center gap-2 tracking-wide">
                 Assessed Priority: {r?.priorityLevel}
              </h3>
              <p className="text-sm opacity-90">{r?.summary}</p>
            </div>

            <div className="space-y-4">
              <div>
                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Chief Complaint</p>
                 <p className="text-slate-900 dark:text-slate-200 font-medium">{session.symptoms}</p>
              </div>
              
              {r?.riskFactors && r.riskFactors !== "None detected" && (
                <div>
                  <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1 flex flex-row items-center gap-1"><ShieldAlert size={12}/> Identified Risks</p>
                  <p className="text-slate-900 dark:text-slate-200 font-medium">{r.riskFactors}</p>
                </div>
              )}

              {r?.careSuggestions && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1 flex items-center gap-1"><FileText size={12} /> Pre-Consultation Care</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{r.careSuggestions}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Decentralized Doctor Selection */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {isAssigned ? <CheckCircle2 className="text-emerald-500" /> : <Users className="text-indigo-500" />}
            {isAssigned ? "Queue Position Secured" : "Live Consultant Desks"}
          </h2>

          <AnimatePresence mode="wait">
            {isAssigned ? (
               <motion.div 
                 key="assigned"
                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                 className="bg-emerald-500 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Users size={120} />
                 </div>
                 <div className="relative z-10">
                   <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-sm font-bold tracking-wider mb-4">ACTIVE QUEUE</div>
                   <h3 className="text-3xl font-extrabold mb-1">{session.doctor?.fullName}</h3>
                   <p className="text-emerald-50 text-lg mb-8">{session.doctor?.specialization}</p>
                   
                   <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                     <p className="flex items-center gap-2 font-medium"><CheckCircle2 /> Medical Report Shared Securely.</p>
                     <p className="mt-2 text-sm text-emerald-100">The doctor has received your AI pre-consultation report and vitals. Please wait here. You will be called in according to your designated priority level rather than your arrival time.</p>
                   </div>
                 </div>
               </motion.div>
            ) : (
               <motion.div key="selection" className="space-y-4">
                 <p className="text-slate-500 dark:text-slate-400 mb-6">Review the current active waitlists below and share your AI Report with a doctor to join their queue.</p>
                 
                 {doctors.map((doctor) => (
                   <div 
                     key={doctor.id}
                     onClick={() => setSelectedDoctorId(doctor.id)}
                     className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                       selectedDoctorId === doctor.id 
                         ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                         : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                     }`}
                   >
                     <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${selectedDoctorId === doctor.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                          <UserPlus size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{doctor.fullName}</h3>
                          <p className="text-sm text-slate-500">{doctor.specialization}</p>
                        </div>
                     </div>
                     
                     <div className="flex flex-col items-start sm:items-end">
                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                           <Clock size={12} /> {doctor.queueCount} Waiting
                        </div>
                        {selectedDoctorId === doctor.id && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAssign(); }}
                            disabled={assigning}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-colors"
                          >
                            {assigning ? "Sharing..." : "Share Report & Join"} <ArrowRight size={14} />
                          </button>
                        )}
                     </div>
                   </div>
                 ))}
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-10 flex justify-center items-center"><div className="animate-pulse text-indigo-500 font-medium">Loading...</div></div>}>
      <PatientDashboardContent />
    </Suspense>
  );
}
