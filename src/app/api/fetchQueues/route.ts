import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { fetchQueues } from ".";

export async function POST(req: NextRequest) {
  const { restaurantId } = await req.json();

  if (!restaurantId) {
    return NextResponse.json({ error: "restaurantId is required" }, { status: 400 });
  }

  try {
    const queues = await fetchQueues(restaurantId);
    return NextResponse.json(queues);
  } catch (error) {
    console.error("Error fetching queues:", error);
    return NextResponse.json({ error: "Failed to fetch queues" }, { status: 500 });
  }
}