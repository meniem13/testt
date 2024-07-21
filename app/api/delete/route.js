// app/api/delete/route.js
import { NextResponse } from "next/server";
import connectDB from "../db";
import User from "../models/User";

export async function DELETE(request) {
  await connectDB();

  const { id } = await request.json();
  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
