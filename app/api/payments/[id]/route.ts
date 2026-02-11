import { NextResponse } from "next/server";
import { mockPayments } from "@/lib/mock-data";

const payments = [...mockPayments];

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const index = payments.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }
  payments[index] = { ...payments[index], ...body };
  return NextResponse.json(payments[index]);
}
