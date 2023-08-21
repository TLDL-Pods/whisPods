// file: /pages/api/latest-episode.ts

import { NextResponse } from "next/server";
import { getClientAndDb } from "../mongo/db";

export async function GET() {
  try {
    const { db } = await getClientAndDb();
    const collection = db.collection("thedailygweiRecap");

    // Fetch the latest episode from the collection
    const latestEpisode = await collection
      .find()
      .sort({ episode_data: -1 })
      .limit(1)
      .toArray();

    // Since latestEpisode is an array with one document, extract the single document
    const episode = latestEpisode[0];

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: episode,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
