import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const d1 = await db.doctor.create({ data: { fullName: "Dr. Sarah Jenkins", specialization: "Cardiology" } });
    const d2 = await db.doctor.create({ data: { fullName: "Dr. Alan Turing", specialization: "General Practice" } });
    const d3 = await db.doctor.create({ data: { fullName: "Dr. Gregory House", specialization: "Internal Medicine" } });

    return NextResponse.json({ success: true, seeded: [d1, d2, d3] });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
