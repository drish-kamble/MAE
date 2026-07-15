import mongoose from "mongoose";
import XLSX from "xlsx";
import Product from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const seedFromExcel = async () => {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    // 🔥 FORCE CLEAN DB (VERY IMPORTANT)
    await Product.deleteMany({});
    console.log("🧹 Old products deleted");

    console.log("📄 Reading Excel...");
    const workbook = XLSX.readFile("../seed/Product_Database.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log(`📦 ${rows.length} rows found in Excel`);

    let inserted = 0;
    let skipped = 0;

    let index = 0; // 🔥 THIS FIXES ORDER

    for (const row of rows) {
      // Skip empty rows
      if (
        (!row["Product Name"] || row["Product Name"].trim() === "") &&
        (!row["Model Number"] || row["Model Number"].trim() === "") &&
        (!row["Part Number"] || row["Part Number"].trim() === "")
      ) {
        skipped++;
        continue;
      }

      if (!row["Product Name"]) {
        skipped++;
        continue;
      }

      const numericPrice = Number(row["Price"]);
      const isFixed = !isNaN(numericPrice) && numericPrice > 0;

      const productData = {
        name: String(row["Product Name"]).trim(),
        modelNumber: String(row["Model Number"] || "").trim(),
        partNumber: String(
          row["Part Number"] || row["Model Number"] || ""
        ).trim(),

        brand: row["Brand"] || "",
        productType: row["Product Type"] || "",
        description: row["Short Description"] || "",

        pricingType: isFixed ? "FIXED" : "QUOTE",
        price: isFixed ? numericPrice : null,
        currency: row["Currency"] || "INR",

        stockStatus: row["Stock Status"] || "",
        datasheet: row["Datasheet link"] || "",
        image: row["Image link"] || "",

        sequence: index++, // 🔥 THIS IS THE MAIN FIX

        hsnCode: row["HSN Code"] || "",
        gstRate: row["GST Rate"] || null,
      };

      await Product.create(productData);
      inserted++;
    }

    console.log("\n✅ DONE");
    console.log(`✔ Inserted: ${inserted}`);
    console.log(`⚠ Skipped: ${skipped}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedFromExcel();