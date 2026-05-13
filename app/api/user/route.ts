import { NextResponse } from "next/server";

let mockUser = {};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.email.includes("@")) {
      return NextResponse.json({ message: "Invalid email format",result: false }, { status: 400 });
    }

    mockUser = { ...data, id: Date.now() }; 
    return NextResponse.json({ message: "User created", data: mockUser,result: true  }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

