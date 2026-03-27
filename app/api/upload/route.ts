import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "لم يتم اختيار ملف" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeFileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    // 👇 هنا الذكاء
    let uploadDir = "";

    if (process.env.NODE_ENV === "development") {
      // على جهازك
      uploadDir = path.join(process.cwd(), "public", "uploads");
    } else {
      // على السيرفر
      uploadDir = "/var/www/images";
    }

    // 👇 تأكد أن المجلد موجود
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, safeFileName);

    fs.writeFileSync(filePath, buffer);

    let imageUrl = "";

    if (process.env.NODE_ENV === "development") {
      // رابط محلي
      imageUrl = `/uploads/${safeFileName}`;
    } else {
      // رابط السيرفر
      const baseUrl =
        process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
        "https://coronaled-clayton-disappointingly.ngrok-free.dev";

      imageUrl = `${baseUrl}/images/${safeFileName}`;
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "فشل رفع الصورة" },
      { status: 500 }
    );
  }
}