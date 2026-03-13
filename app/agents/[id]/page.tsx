import { AgentDetails } from "@/components/agent-details";
import { agents } from "@/lib/mock-data";

export default function EditAgentPage({ params }: { params: { id: string } }) {
  const agent = agents.find((a) => a.id === params.id) || agents[0];

  const mockInitialData = {
    ...agent,
    agent_name: agent.name,
    voice_id: agent.voiceModel,
    system_prompt: "# Personality\nYou are Sam, the front desk receptionist at a mid-size company. You are quick, polished, and efficient — you get callers where they need to go without wasting their time. Friendly but businesslike, never flustered.",
  };

  return <AgentDetails initialData={mockInitialData} />;
}
