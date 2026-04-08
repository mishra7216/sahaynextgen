// Mock AI Engine for Triage. 
// This simulates processing patient health data using LLM logic to return a structured response.

type TriageInput = {
  symptoms: string;
  durationDays: number;
  age: number;
  pastDiseases?: string;
  chronicIllnesses?: string;
};

export type TriageOutput = {
  priorityLevel: "EMERGENCY" | "MODERATE" | "ROUTINE";
  summary: string;
  riskFactors: string;
  recommendedSpec: string;
  careSuggestions: string;
};

export async function processTriageData(input: TriageInput): Promise<TriageOutput> {
  // Simulate AI API delay (e.g., calling OpenAI)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  const symptoms = input.symptoms.toLowerCase();
  const history = (input.pastDiseases + " " + input.chronicIllnesses).toLowerCase();
  
  // Simulated AI Logic parsing symptoms
  if (symptoms.includes("chest") || symptoms.includes("breath") || symptoms.includes("severe") || history.includes("heart")) {
    return {
      priorityLevel: "EMERGENCY",
      summary: "Patient reports severe distress indicating potential cardiac or acute respiratory involvement.",
      riskFactors: "Myocardial Infarction, Acute Respiratory Failure",
      recommendedSpec: "Cardiology / ER",
      careSuggestions: "Seek immediate emergency assistance. Do not drive yourself to the hospital. Sit down and rest quietly while help is on the way."
    };
  }

  if (symptoms.includes("fever") || input.durationDays > 3 || history.includes("diabetes")) {
    return {
      priorityLevel: "MODERATE",
      summary: `Patient presents with ${input.symptoms} lasting ${input.durationDays} days. Moderate risk due to symptom duration or history.`,
      riskFactors: "Secondary infection, Dehydration",
      recommendedSpec: "Internal Medicine",
      careSuggestions: "Stay heavily hydrated. Monitor temperature every 4 hours. Take adequate rest and avoid heavy physical exertion until consultation."
    };
  }

  return {
    priorityLevel: "ROUTINE",
    summary: `Patient reports mild symptoms (${input.symptoms}). Vital stats check out.`,
    riskFactors: "None detected",
    recommendedSpec: "General Practice",
    careSuggestions: "Continue normal daily activities. Keep a mild symptom log if any new issues arise before your routine checkup."
  };
}
