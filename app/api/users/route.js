// app/api/users/route.js
import { NextResponse } from "next/server";
import connectDB from "../db";
import User from "../models/User";

export async function GET() {
  await connectDB();

  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
