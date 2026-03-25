import mongoose, { Schema, model, models } from "mongoose";

const FuelSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // e.g. "Super Petrol"
    },
    price: {
      type: Number,
      required: true, // e.g. 280.50
    },
    prevPrice: {
      type: Number,
      required: true, // e.g. 275.00
    },
    trend: {
      type: String,
      enum: ["up", "down", "stable"], // Sirf ye 3 values allow hongi
      default: "stable",
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true } // Ye khud CreatedAt aur UpdatedAt date add karega
);

// Agar model pehle se bana hai to wo use kro, warna naya banao
const Fuel = models.Fuel || model("Fuel", FuelSchema);

export default Fuel;