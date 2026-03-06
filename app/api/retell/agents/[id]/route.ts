import { NextRequest, NextResponse } from "next";

const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function PATCH(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  if (!RETELL_API_KEY) {
    return NextResponse.json({ error: "Missing RETELL_API_KEY" }, { status: 500 });
  }

  const { id: agentId } = await context.params;

  try {
    const body = await req.json();
    const { agent_name, voice_id, system_prompt, post_call_webhook_url, tools, llm_id } = body;

    // 1. Update LLM (if provided)
    if (llm_id) {
       const llmRes = await fetch(`https://api.retellai.com/update-retell-llm/${llm_id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${RETELL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          general_prompt: system_prompt,
          general_tools: tools?.map((t: any) => ({
            type: "custom",
            name: t.name,
            description: t.description,
            url: t.url,
          })),
        }),
      });
      if (!llmRes.ok) {
        console.error("Failed to update LLM:", await llmRes.text());
      }
    }

    // 2. Update Agent
    const agentDataToUpdate: any = {};
    if (agent_name) agentDataToUpdate.agent_name = agent_name;
    if (voice_id) agentDataToUpdate.voice_id = voice_id;
    if (post_call_webhook_url) {
      agentDataToUpdate.post_call_analysis_data = [
        {
           type: "webhook",
           url: post_call_webhook_url
        }
      ]
    }

    const agentRes = await fetch(`https://api.retellai.com/update-agent/${agentId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentDataToUpdate),
    });

    if (!agentRes.ok) {
      const errorText = await agentRes.text();
      return NextResponse.json({ error: "Failed to update Agent", details: errorText }, { status: agentRes.status });
    }

    const agentData = await agentRes.json();
    return NextResponse.json(agentData, { status: 200 });

  } catch (error: any) {
    console.error("API Error updating agent:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error?.message }, { status: 500 });
  }
}
