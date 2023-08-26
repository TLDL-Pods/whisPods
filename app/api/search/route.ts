import { NextResponse, NextRequest } from "next/server";
import { getClientAndDb } from "@/app/api/mongo/db";
import type { SegmentProps } from "@/types";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ status: 405, message: "Method Not Allowed" });
  }

  try {
    const { db } = await getClientAndDb();
    const collection = db.collection("thedailygweiRecap");

    // Check if the index already exists
    const indexes = await collection.listIndexes().toArray();
    if (!indexes.some((index) => "episode_data.summary" in index.key)) {
      try {
        await collection.createIndex({ "episode_data.summary": "text" });
      } catch (error: any) {
        console.error("Error creating index:", error.message);
      }
    }

    const { searchParams } = req.nextUrl;
    const searchTerm = searchParams.get("term");

    if (!searchTerm) {
      return NextResponse.json({
        status: 400,
        message: "Search term is required",
      });
    }

    const searchResults = await collection
      .find(
        {
          $text: {
            $search: searchTerm as string,
          },
        },
        {
          projection: {
            score: { $meta: "textScore" },
          },
        }
      )
      .sort({ score: { $meta: "textScore" } })
      .toArray();

    // Identify the matching segment_number for each episode
    searchResults.forEach((episode) => {
      episode.matchedSegmentNumbers = episode.episode_data
        .filter((segment: SegmentProps) =>
          segment.summary.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((matchedSegment: SegmentProps) => matchedSegment.segment_number);
    });

    const response = NextResponse.json({
      status: 200,
      message: "Success",
      data: searchResults,
    });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
