import mongoose from "mongoose";
import XLSX from "xlsx";
import Product from "../models/Product.js";
import "../config/env.js";

const seedFromExcel = async () => {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("📄 Reading Excel...");
    const workbook = XLSX.readFile("./seed/Product_Database.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log(`📦 ${rows.length} products found`);

    for (const row of rows) {
      // normalize price
      const numericPrice = Number(row["Price"]);
      const isFixed = !isNaN(numericPrice) && numericPrice > 0;

      const productData = {
        name: String(row["Product Name"]).trim(),
        modelNumber: String(row["Model Number"] || "").trim(),
         partNumber: String(row["Part Number"] || row["Model Number"]), // ✅ ADD
        brand: row["Brand"] || "",
        productType: row["Product Type"] || "",
        description: row["Short Description"] || "",

        pricingType: isFixed ? "FIXED" : "QUOTE",
        price: isFixed ? numericPrice : null,
        currency: row["Currency"] || "INR",

        stockStatus: row["Stock Status"] || "",
        datasheet: row["Datasheet link"] || "",
        image: row["Image link"] || "",

        hsnCode: row["HSN Code"] || "",
        gstRate: row["GST Rate"] || null,
      };

      // UPSERT using modelNumber (preferred) or name
      const lookup = productData.modelNumber
        ? { modelNumber: productData.modelNumber }
        : { name: productData.name };

      const result = await Product.findOneAndUpdate(
        lookup,
        { $set: productData },
        { upsert: true, new: true }
      );

      console.log(
        `✔ ${result.name} → ${result.pricingType}`
      );
    }

    console.log("✅ Excel → MongoDB sync complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedFromExcel();
