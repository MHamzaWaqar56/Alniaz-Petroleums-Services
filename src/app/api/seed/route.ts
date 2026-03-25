import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Fuel from "@/models/Fuel";
import User from "@/models/User"; // User model import kia
import bcrypt from "bcryptjs";    // Password secure krne k liye

export async function GET() {
  try {
    await connectDB();

    // --- 1. FUEL RATES (Purana code) ---
    await Fuel.deleteMany({});
    await Fuel.create([
      {
        name: "Super Petrol",
        price: 280.50,
        prevPrice: 275.00,
        status: "available",
        trend: "up"
      },
      {
        name: "High Speed Diesel",
        price: 290.00,
        prevPrice: 288.00,
        status: "available",
        trend: "up"
      },
    ]);

    // --- 2. ADMIN USER (Naya code) ---
    // Pehle purane users delete krein (taake duplicate na ho)
    await User.deleteMany({});

    // Password ko secure (Hash) krein
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Naya Admin User banayen
    await User.create({
      name: "Waheed Admin",
      email: "admin@waheed.com",
      password: hashedPassword,
      role: "admin", // Agar apke model me role hai to
    });

    return NextResponse.json({
      message: "Success! Fuel Rates aur Admin User (admin@waheed.com) ban gaya ha."
    });

  } catch (error: any) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 500 });
  }
}