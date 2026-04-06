import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { processTriageData } from "@/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Create Patient
    const patient = await db.patient.create({
      data: {
        fullName: data.fullName || "Unknown Patient",
        age: parseInt(data.age) || 30,
        gender: data.gender || "Not Specified",
        contact: data.contact || "",
        address: data.address || "",
        bloodGroup: data.bloodGroup,
        heightCm: data.heightCm ? parseFloat(data.heightCm) : null,
        weightKg: data.weightKg ? parseFloat(data.weightKg) : null,
        pastDiseases: data.pastDiseases,
        allergies: data.allergies,
        chronicIllnesses: data.chronicIllnesses,
        familyHistory: data.familyHistory,
      }
    });

    // 2. Create TriageSession
    const currentSymptoms = data.currentSymptoms || "General follow-up.";
    const durationDays = data.durationDays ? parseInt(data.durationDays) : 1;

    const triageSession = await db.triageSession.create({
      data: {
        patientId: patient.id,
        symptoms: currentSymptoms,
        durationDays: durationDays,
      }
    });

    // 3. Process Triage Data with AI Engine
    const aiOutput = await processTriageData({
      symptoms: currentSymptoms,
      durationDays: durationDays,
      age: patient.age,
      pastDiseases: patient.pastDiseases || "",
      chronicIllnesses: patient.chronicIllnesses || "",
    });

    // 4. Save AI Result back to Database
    const result = await db.triageResult.create({
      data: {
        sessionId: triageSession.id,
        priorityLevel: aiOutput.priorityLevel,
        summary: aiOutput.summary,
        riskFactors: aiOutput.riskFactors,
        recommendedSpec: aiOutput.recommendedSpec || null,
      }
    });

    return NextResponse.json({ patient, triageSession, result }, { status: 201 });
  } catch (error) {
    console.error("Triage Submission Error:", error);
    return NextResponse.json({ error: "Failed to process the triage data." }, { status: 500 });
  }
}
