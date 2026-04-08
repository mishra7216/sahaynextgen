import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { sessionId, doctorId } = await req.json();

    if (!sessionId || !doctorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const session = await db.triageSession.update({
      where: { id: sessionId },
      data: { doctorId },
    });

    return NextResponse.json({ success: true, session }, { status: 200 });
  } catch (error) {
    console.error("Assign Error:", error);
    return NextResponse.json({ error: "Failed to assign doctor" }, { status: 500 });
  }
}
