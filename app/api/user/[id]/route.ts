import { NextResponse } from "next/server";

const mockUsers = [
  { id: "1", username: "User One", email: "one@example.com" },
  { id: "2", username: "User Two", email: "two@example.com" },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "User info Successfully GET",data: user, result: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  const updatedUser = { id, ...body };

  return NextResponse.json({
    message: "User info Successfully updated",
    result: true,
    data: updatedUser 
  });
}