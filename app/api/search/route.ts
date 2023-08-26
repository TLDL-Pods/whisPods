import { NextResponse, NextRequest } from "next/server";
import { getClientAndDb } from "@/app/api/mongo/db";
import type { SegmentProps } from "@/types";
import { parse } from "url";
import { URL } from "url";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ status: 405, message: "Method Not Allowed" });
  }

  try {
    const { db } = await getClientAndDb();
    const collection = db.collection("thedailygweiRecap");

    // const host = req.headers.get("host") || "tldl.media";
    // const fullUrl = `https://${host}${req.nextUrl.pathname}${req.nextUrl.search}`;
    // const url = new URL(fullUrl);
    // const searchTerm = url.searchParams.get("term");

    // console.log(req.nextUrl.url);
    // const searchTerm = req.nextUrl.url.searchParams.get("term");

    const url = new URL(req.nextUrl.href);
    const searchTerm = url.searchParams.get("term");

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
