const mongoose = require('mongoose');

// Try this simple connection string
const uri = "mongodb://drishyak:password123@cluster0.qdurnyg.mongodb.net:27017/mae?retryWrites=true&w=majority&ssl=true";

console.log("🔗 Step 1: Testing MongoDB connection...");

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  console.log("✅ SUCCESS! Connected to MongoDB!");
  console.log("🎉 Your database is working!");
  process.exit(0);
})
.catch((error) => {
  console.log("❌ FAILED to connect");
  console.log("Error:", error.message);
  
  // Try original connection string
  console.log("\n🔗 Step 2: Trying original connection string...");
  const uri2 = "mongodb+srv://drishyak:Perfect12%405@cluster0.qdurnyg.mongodb.net/mae?retryWrites=true&w=majority";
  
  return mongoose.connect(uri2, {
    serverSelectionTimeoutMS: 10000,
  });
})
.then(() => {
  console.log("✅ Original connection worked!");
  console.log("💡 The problem was DNS. Change your DNS to Google DNS:");
  console.log("    Preferred: 8.8.8.8");
  console.log("    Alternate: 8.8.4.4");
  process.exit(0);
})
.catch((error) => {
  console.log("❌ Both connection attempts failed");
  console.log("Final error:", error.message);
  console.log("\n🎯 SOLUTION:");
  console.log("1. Go to https://cloud.mongodb.com");
  console.log("2. Security → Database Access → Change password to simple one");
  console.log("3. Security → Network Access → Add IP Address → Allow All (0.0.0.0/0)");
  console.log("4. Wait 2 minutes and try again");
  process.exit(1);
});