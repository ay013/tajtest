import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = Buffer.from(`${user.id}:${user.role}:${Date.now()}`).toString(
    "base64"
  );

  return NextResponse.json({
    user: userWithoutPassword,
    token,
  });
}
