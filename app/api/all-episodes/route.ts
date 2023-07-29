// file: /pages/api/all-episodes.ts

import { NextResponse } from "next/server";
import { getClientAndDb } from "../mongo/db";

export async function GET() {
  try {
    const { db } = await getClientAndDb();
    const collection = db.collection("thedailygweiRecap");

    // Fetch all documents from the collection
    const data = await collection.find().toArray();

    return NextResponse.json({ status: 200, message: "Success", data: data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
