import { NextRequest, NextResponse } from "next/server";

const RETELL_BASE_URL = "https://api.retellai.com";

export async function GET(req: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RETELL_API_KEY not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint"); // "get-agents" or "get-calls"

  if (!endpoint || !["get-agents", "get-calls"].includes(endpoint)) {
    return NextResponse.json(
      { error: "Invalid endpoint. Use 'get-agents' or 'get-calls'." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${RETELL_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json(
        { error: `Retell API error: ${response.status}`, details: errorBody },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Retell API request failed:", error);
    return NextResponse.json(
      { error: "Failed to connect to Retell AI" },
      { status: 502 }
    );
  }
}
