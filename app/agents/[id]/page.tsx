import { AgentForm } from "@/components/agent-form";

// Note: In a real app we would fetch the agent data by ID server-side here, 
// but for now we'll pass some mock initial data.
export default function EditAgentPage({ params }: { params: { id: string } }) {
  const mockInitialData = {
    id: params.id,
    agent_name: "Booking Assistant",
    description: "Handles inbound calls to schedule appointments",
    voice_id: "11labs-rachel",
    system_prompt: "You are an AI assistant for a premier auto shop. Your goal is to collect the vehicle make and model, and schedule the user's repair.",
    post_call_webhook_url: "https://hook.us2.make.com/post-call",
    tools: [
      {
        name: "check_schedule",
        description: "Call this to check if a specific time is available on the calendar.",
        url: "https://hook.us2.make.com/check-schedule"
      }
    ],
    llm_id: "llm_12345"
  };

  return <AgentForm initialData={mockInitialData} isEditing={true} />;
}
