import bcrypt from "bcrypt";
import Admin from "./src/models/admin.js";
import connectDB from "./src/libs/mongodb.js";

async function createAdmin() {
  await connectDB();

  const email = "hertiermunyakazi@gmail.com";
  const password = "Kalifv@12";

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    email,
    password: hashedPassword,
  });

  await admin.save();
  console.log("Admin created");
  process.exit(0);
}

createAdmin().catch(console.error);
