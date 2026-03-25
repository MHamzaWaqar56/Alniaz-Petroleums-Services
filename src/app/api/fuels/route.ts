import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Fuel from "@/models/Fuel";

// ✅ Vercel پر کیشنگ روکنے کے لیے
export const dynamic = "force-dynamic";

// --- GET REQUEST (Fetch All Fuels) ---
export async function GET() {
  try {
    await connectDB();

    let fuels = await Fuel.find({}).sort({ createdAt: 1 });

    // اگر ڈیٹا بیس خالی ہو تو ڈیفالٹ فیولز بنائیں
    if (fuels.length === 0) {
      const defaultFuels = [
        { name: "Super Petrol", price: 280.00, prevPrice: 275.00, trend: "stable", status: "available" },
        { name: "High Speed Diesel", price: 290.00, prevPrice: 285.00, trend: "stable", status: "available" },
        { name: "High Octane", price: 300.00, prevPrice: 295.00, trend: "stable", status: "available" },
      ];
      fuels = await Fuel.create(defaultFuels);
    }

    return NextResponse.json(fuels);
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch fuels" }, { status: 500 });
  }
}

// --- PUT REQUEST (Update Price & Status) ---
export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, price, status } = body;

    // 1. بنیادی چیک (Validation)
    if (!id || price === undefined || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. قیمت کو نمبر میں تبدیل کریں (بہت ضروری)
    const newPrice = Number(price);
    if (isNaN(newPrice)) {
      return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
    }

    // 3. پرانا ریکارڈ ڈھونڈیں
    const existingFuel = await Fuel.findById(id);
    if (!existingFuel) {
      return NextResponse.json({ error: "Fuel not found" }, { status: 404 });
    }

    // 4. ٹرینڈ (Trend) کی کیلکولیشن
    let trend = existingFuel.trend;
    let prevPrice = existingFuel.prevPrice;

    // اگر نئی قیمت پرانی سے مختلف ہے تبھی ٹرینڈ بدلیں
    if (newPrice > existingFuel.price) {
      trend = "up";
      prevPrice = existingFuel.price;
    } else if (newPrice < existingFuel.price) {
      trend = "down";
      prevPrice = existingFuel.price;
    } else {
      // اگر قیمت وہی ہے جو پہلے تھی
      trend = "stable";
      // prevPrice وہی رہے گی جو ڈیٹا بیس میں ہے
    }

    // 5. ڈیٹا بیس اپ ڈیٹ کریں
    const updatedFuel = await Fuel.findByIdAndUpdate(
      id,
      {
        price: newPrice,
        prevPrice: prevPrice,
        trend: trend,
        status: status
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedFuel);

  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: error.message || "Update failed" }, { status: 500 });
  }
}