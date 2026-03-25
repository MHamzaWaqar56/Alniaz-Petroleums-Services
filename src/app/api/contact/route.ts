import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";

// ⚠️ FORCE DYNAMIC: Taake Vercel/Next.js data ko cache na kare aur foran naya message dikhaye
export const dynamic = "force-dynamic";

// --- 1. POST (Frontend se message receive kr k DB ma save krna) ---
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    // Save to MongoDB
    await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone, // Optional
      subject: body.subject || "General Inquiry",
      message: body.message,
    });

    return NextResponse.json({ message: "Message Sent Successfully!" }, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// --- 2. GET (Admin Dashboard k liye messages fetch krna) ---
export async function GET() {
  try {
    await connectDB();
    // Sort: -1 ka matlab newest pehle
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// --- 3. DELETE (Admin message delete kar sake) ---
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }

    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}