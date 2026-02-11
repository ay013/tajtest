import { NextResponse } from "next/server";
import { mockWorkers } from "@/lib/mock-data";

const workers = [...mockWorkers];

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const index = workers.findIndex((w) => w.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }
  workers[index] = { ...workers[index], ...body };
  return NextResponse.json(workers[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = workers.findIndex((w) => w.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }
  workers.splice(index, 1);
  return NextResponse.json({ success: true });
}
