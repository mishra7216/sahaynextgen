import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const PRIORITY_WEIGHTS: Record<string, number> = {
  "EMERGENCY": 1,
  "MODERATE": 2,
  "ROUTINE": 3,
};

export async function GET(req: Request) {
  try {
    // 1. Check for specific doctorId scope
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId");

    // 2. Query pending database sessions mapped to this doctor
    const sessions = await db.triageSession.findMany({
      where: {
        status: "PENDING",
        ...(doctorId ? { doctorId } : {})
      },
      include: {
        patient: true,
        triageResult: true,
      },
      orderBy: {
         createdAt: 'asc' // Secondary sort by wait time
      }
    });

    // 2. Sort by Priority Level (Emergency first)
    const sortedQueue = sessions.sort((a: any, b: any) => {
      const p1 = a.triageResult?.priorityLevel ? PRIORITY_WEIGHTS[a.triageResult.priorityLevel] : 99;
      const p2 = b.triageResult?.priorityLevel ? PRIORITY_WEIGHTS[b.triageResult.priorityLevel] : 99;
      
      return p1 - p2; 
    });

    return NextResponse.json({ queue: sortedQueue }, { status: 200 });
  } catch (error) {
    console.error("Queue Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch priority queue" }, { status: 500 });
  }
}
