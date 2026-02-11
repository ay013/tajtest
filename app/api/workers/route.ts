import { NextResponse } from "next/server";
import { mockWorkers } from "@/lib/mock-data";

const workers = [...mockWorkers];

export async function GET() {
  return NextResponse.json(workers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newWorker = {
    ...body,
    id: `w${Date.now()}`,
  };
  workers.push(newWorker);
  return NextResponse.json(newWorker, { status: 201 });
}
