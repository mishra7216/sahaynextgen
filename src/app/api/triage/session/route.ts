import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "Missing session ID" }, { status: 400 });

    const session = await db.triageSession.findUnique({
      where: { id },
      include: { 
        patient: true, 
        triageResult: true,
        doctor: true,
      },
    });

    if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
