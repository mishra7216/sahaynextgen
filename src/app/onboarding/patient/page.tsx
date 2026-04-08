"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, HeartPulse, ShieldAlert, Activity } from "lucide-react";

type OnboardingData = {
  // Step 1
  fullName: string;
  age: string;
  gender: string;
  address: string;
  contact: string;
  // Step 2
  bloodGroup: string;
  heightCm: string;
  weightKg: string;
  // Step 3
  currentSymptoms: string;
  durationDays: string;
  pastDiseases: string;
  allergies: string;
  chronicIllnesses: string;
  familyHistory: string;
};

const STEPS = [
  { id: 1, title: "Personal Details", icon: <HeartPulse className="w-5 h-5" /> },
  { id: 2, title: "Vitals & Health", icon: <Activity className="w-5 h-5" /> },
  { id: 3, title: "Medical Background", icon: <ShieldAlert className="w-5 h-5" /> },
];

export default function PatientOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: "", age: "", gender: "Male", address: "", contact: "",
    bloodGroup: "A+", heightCm: "", weightKg: "",
    currentSymptoms: "", durationDays: "",
    pastDiseases: "", allergies: "", chronicIllnesses: "", familyHistory: "",
  });

  const updateForm = (field: keyof OnboardingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
    else {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/triage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          router.push(`/dashboard/patient?sessionId=${data.triageSession.id}`);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    else router.push("/role-selection");
  };

  // Auto calculate BMI
  const heightM = Number(formData.heightCm) / 100;
  const bmi = heightM > 0 && formData.weightKg ? (Number(formData.weightKg) / (heightM * heightM)).toFixed(1) : "--";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6 flex justify-center">
      <div className="max-w-3xl w-full">
        {/* Progress Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Complete your Patient Profile
          </h1>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-medical-500 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
            
            {STEPS.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors ${
                    currentStep >= step.id 
                      ? "bg-medical-500 border-white dark:border-slate-950 text-white" 
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-6 h-6" /> : step.icon}
                </div>
                <span className={`text-xs font-medium ${currentStep >= step.id ? "text-medical-600 dark:text-medical-400" : "text-slate-400"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                      <input type="text" value={formData.fullName} onChange={e => updateForm("fullName", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="e.g. John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Age</label>
                      <input type="number" value={formData.age} onChange={e => updateForm("age", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="Years" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gender</label>
                      <select value={formData.gender} onChange={e => updateForm("gender", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow">
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contact Number</label>
                      <input type="tel" value={formData.contact} onChange={e => updateForm("contact", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="+1 234 567 890" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Permanent Address</label>
                      <textarea value={formData.address} onChange={e => updateForm("address", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="Full address..." />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">Vitals & Health</h2>
                  
                  {/* BMI Widget */}
                  <div className="bg-gradient-to-br from-medical-50 to-health-50 dark:from-medical-900/20 dark:to-health-900/20 p-6 rounded-2xl border border-medical-100 dark:border-medical-800/30 flex items-center justify-between mb-8">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Estimated BMI</p>
                      <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{bmi}</p>
                    </div>
                    <Activity className="w-12 h-12 text-medical-200 dark:text-medical-800" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Blood Group</label>
                      <select value={formData.bloodGroup} onChange={e => updateForm("bloodGroup", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow">
                        <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                        <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Height (cm)</label>
                      <input type="number" value={formData.heightCm} onChange={e => updateForm("heightCm", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="e.g. 175" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Weight (kg)</label>
                      <input type="number" value={formData.weightKg} onChange={e => updateForm("weightKg", e.target.value)} className="w-full md:w-[calc(50%-12px)] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="e.g. 70" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">Medical Background</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Symptoms / Chief Complaint</label>
                       <textarea value={formData.currentSymptoms} onChange={e => updateForm("currentSymptoms", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="E.g., Severe chest pain, shortness of breath..." required />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration (Days)</label>
                       <input type="number" value={formData.durationDays} onChange={e => updateForm("durationDays", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="How long have you had these symptoms?" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Past Diseases / Operations</label>
                      <textarea value={formData.pastDiseases} onChange={e => updateForm("pastDiseases", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="Any major past illnesses or surgeries..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Known Allergies</label>
                      <textarea value={formData.allergies} onChange={e => updateForm("allergies", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="E.g., Penicillin, Peanuts..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Chronic Illnesses</label>
                      <textarea value={formData.chronicIllnesses} onChange={e => updateForm("chronicIllnesses", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="E.g., Diabetes, Hypertension..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Family Medical History (Optional)</label>
                      <textarea value={formData.familyHistory} onChange={e => updateForm("familyHistory", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-shadow" placeholder="Any hereditary conditions..." />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-slate-500 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>
            <button 
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-medical-500 text-white font-medium rounded-xl hover:bg-medical-600 shadow-md transition-all active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? "Processing AI..." : currentStep === 3 ? "Complete Profile" : "Continue"}
              {!isSubmitting && currentStep < 3 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
