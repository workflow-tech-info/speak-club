import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const n8nBaseUrl = process.env.N8N_BASE_URL;
  const n8nApiKey = process.env.N8N_API_KEY;

  if (!n8nBaseUrl || !n8nApiKey) {
    return NextResponse.json(
      { error: "N8N_BASE_URL or N8N_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { webhookName, payload } = body;

    if (!webhookName) {
      return NextResponse.json(
        { error: "Missing 'webhookName' in request body" },
        { status: 400 }
      );
    }

    const webhookUrl = `${n8nBaseUrl.replace(/\/$/, "")}/webhook/${webhookName}`;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n8nApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload ?? {}),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json(
        { error: `n8n webhook error: ${response.status}`, details: errorBody },
        { status: response.status }
      );
    }

    // n8n webhooks may return various content types
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    const text = await response.text();
    return NextResponse.json({ message: text || "Webhook triggered successfully" });
  } catch (error) {
    console.error("n8n webhook request failed:", error);
    return NextResponse.json(
      { error: "Failed to trigger n8n webhook" },
      { status: 502 }
    );
  }
}
