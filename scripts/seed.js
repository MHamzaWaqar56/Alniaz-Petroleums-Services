const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" }); // .env file load krne k liye

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI is missing in .env.local file");
  process.exit(1);
}

// User Schema (Temporary definition for script)
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // --- ADMIN DETAILS (Yahan apna email/password likhen) ---
    const adminEmail = "admin@alniazpetroleum.com";
    const adminPassword = "*********"; 
    
    // -------------------------------------------------------

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit();
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create Admin
    await User.create({
      name: "Alniaz Petroleum",
      email: adminEmail,
      password: hashedPassword,
      role: "admin", 
    });

    console.log("🎉 Admin User Created Successfully!");
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedAdmin();
