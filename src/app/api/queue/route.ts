import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const PRIORITY_WEIGHTS: Record<string, number> = {
  "EMERGENCY": 1,
  "MODERATE": 2,
  "ROUTINE": 3,
};

export async function GET() {
  try {
    // 1. Fetch pending triage sessions along with Patient and TriageResult data
    const sessions = await db.triageSession.findMany({
      where: {
        status: "PENDING",
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
