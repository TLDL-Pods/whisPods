import { NextResponse, NextRequest } from "next/server";
import { getClientAndDb } from "../mongo/db";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "25", 25);

    // Calculate the skip value
    const skip = (page - 1) * pageSize;

    const { db } = await getClientAndDb();
    const collection = db.collection("thedailygweiRecap");

    // Fetch documents with pagination
    const data = await collection.find()
                                 .sort({ episode_number: -1 })
                                 .skip(skip)
                                 .limit(pageSize)
                                 .toArray();

    return NextResponse.json({ status: 200, message: "Success", data: data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
