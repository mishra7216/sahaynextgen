import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const doctors = await db.doctor.findMany({
      include: {
        triageSessions: {
          where: { status: "PENDING" },
        },
      },
    });

    // Compute live active queue count for each doctor
    const doctorsWithQueue = doctors.map(doc => ({
      id: doc.id,
      fullName: doc.fullName,
      specialization: doc.specialization,
      queueCount: doc.triageSessions.length
    }));

    return NextResponse.json({ doctors: doctorsWithQueue }, { status: 200 });
  } catch (error) {
    console.error("Doctors Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}
