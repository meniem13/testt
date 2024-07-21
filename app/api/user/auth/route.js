// app/api/user/auth/route.js
import { NextResponse } from "next/server";
import connectDB from "../../db";
import User from "../../models/User";

export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
