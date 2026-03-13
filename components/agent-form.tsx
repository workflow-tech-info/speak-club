"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Play, Plus, Trash2, Webhook, Wrench } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "./ui/page-header";

const toolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Must be a valid URL"),
});

const agentSchema = z.object({
  agent_name: z.string().min(1, "Agent Name is required"),
  description: z.string().optional(),
  voice_id: z.string().min(1, "Voice is required"),
  system_prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  post_call_webhook_url: z.string().url("Must be a valid URL").or(z.literal("")),
  tools: z.array(toolSchema),
});

type AgentFormValues = z.infer<typeof agentSchema>;

interface AgentFormProps {
  initialData?: AgentFormValues & { id?: string, llm_id?: string };
  isEditing?: boolean;
}

export function AgentForm({ initialData, isEditing = false }: AgentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: initialData || {
      agent_name: "",
      description: "",
      voice_id: "11labs-rachel",
      system_prompt: "You are a helpful AI assistant.",
      post_call_webhook_url: "",
      tools: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tools",
  });

  const onSubmit = async (data: AgentFormValues) => {
    setIsSubmitting(true);
    try {
      const url = isEditing && initialData?.id 
        ? `/api/retell/agents/${initialData.id}` 
        : `/api/retell/agents`;
      const method = isEditing ? "PATCH" : "POST";

      const payload = {
        ...data,
        llm_id: initialData?.llm_id, // include if updating
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      
      router.push("/agents");
      router.refresh();
    } catch (error) {
      console.error("Error saving agent:", error);
      alert("Failed to save agent. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      {/* ── Sticky Header ───────────────────────────── */}
      <div className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-[#00ff9c]/10 pb-6 pt-8 mb-8 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-6">
          <Link href="/agents" className="p-2.5 -ml-2 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-[#00ff9c] transition-all border border-transparent hover:border-[#00ff9c]/10">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-[24px] font-bold tracking-widest text-white font-mono uppercase">
              {isEditing ? "EDIT_AGENT_PROTOCOL" : "INIT_NEW_AGENT"}
            </h1>
            <p className="mt-1 text-[11px] text-zinc-600 font-mono uppercase tracking-tighter">
              {isEditing ? `MGMT_NODE: ${initialData?.agent_name}` : "CONFIG_VOICE_NEURAL_UPLINK_TOOLS"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold text-zinc-400 bg-white/5 border border-white/10 hover:border-[#00ff9c]/30 hover:text-white rounded-xl transition-all font-mono uppercase tracking-widest">
            <Play className="h-4 w-4" />
            INITIALIZE_TEST
          </button>
          <button 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.1)] disabled:opacity-50 font-mono uppercase tracking-widest"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "COMMIT_PENDING..." : "PROTOCOL_COMMIT"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left Column (Config) ───────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="p-8">
            <h2 className="text-[12px] font-bold text-[#00ff9c] mb-6 font-mono uppercase tracking-[0.2em]">CORE_CONFIGURATION</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">AGENT_IDENTIFIER</label>
                  <input
                    {...form.register("agent_name")}
                    className="w-full px-5 py-3.5 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-white focus:border-[#00ff9c] outline-none transition-all font-mono"
                    placeholder="e.g. UPLINK_NODE_01"
                  />
                  {form.formState.errors.agent_name && (
                    <p className="text-red-500 text-[10px] mt-1 font-mono">{form.formState.errors.agent_name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">NEURAL_VOICE_UPLINK</label>
                  <div className="relative">
                    <select
                      {...form.register("voice_id")}
                      className="w-full px-5 py-3.5 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-white focus:border-[#00ff9c] outline-none transition-all appearance-none cursor-pointer font-mono"
                    >
                      <option value="11labs-rachel">ElevenLabs - Rachel (Neuro, Calm)</option>
                      <option value="11labs-adam">ElevenLabs - Adam (Neuro, Confident)</option>
                      <option value="openai-alloy">OpenAI - Alloy (Synthesized)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                      <Plus className="h-3 w-3 rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">INTERNAL_IDENT_DESC</label>
                <input
                  {...form.register("description")}
                  className="w-full px-5 py-3.5 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-white focus:border-[#00ff9c] outline-none transition-all font-mono"
                  placeholder="PROTOCOL_USE_CASE_DATA"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono flex justify-between">
                  <span>SYSTEM_PROMPT_ARCHITECTURE</span>
                  <span className="text-[#00ff9c]/40 font-normal">CORE_LOGIC_PROTOCOLS</span>
                </label>
                <textarea
                  {...form.register("system_prompt")}
                  rows={12}
                  className="w-full px-6 py-5 text-[13px] leading-relaxed bg-black border border-[#00ff9c]/10 rounded-xl text-[#00ff9c] focus:border-[#00ff9c]/40 outline-none transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] resize-y font-mono"
                  placeholder="# IDENTITY_PROTOCOL_INIT..."
                />
                {form.formState.errors.system_prompt && (
                  <p className="text-red-500 text-[10px] mt-1 font-mono">{form.formState.errors.system_prompt.message}</p>
                )}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-[12px] font-bold text-[#00ff9c] mb-1 font-mono uppercase tracking-[0.2em]">POST_CALL_AUTOMATION</h2>
            <p className="text-[10px] text-zinc-600 mb-6 font-mono uppercase tracking-tighter italic">TRIGGER_N8N_WORKFLOW_ON_TERMINATION</p>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono flex items-center gap-2">
                <Webhook className="h-3.5 w-3.5" /> COMMAND_WEBHOOK_URL
              </label>
              <input
                {...form.register("post_call_webhook_url")}
                className="w-full px-5 py-3.5 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-[#00ff9c] focus:border-[#00ff9c] outline-none transition-all font-mono opacity-80"
                placeholder="https://uplink.n8n.io/..."
              />
              {form.formState.errors.post_call_webhook_url && (
                <p className="text-red-500 text-[10px] mt-1 font-mono">{form.formState.errors.post_call_webhook_url.message}</p>
              )}
            </div>
          </GlassCard>
        </div>

        {/* ── Right Column (Tools) ────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[12px] font-bold text-white font-mono uppercase tracking-widest">SUB_PROGRAMS</h2>
            <button
              onClick={() => append({ name: "", description: "", url: "" })}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold text-[#00ff9c] bg-[#00ff9c]/5 border border-[#00ff9c]/20 hover:bg-[#00ff9c]/10 rounded-lg transition-all font-mono uppercase tracking-widest"
            >
              <Plus className="h-3.5 w-3.5" />
              ADD_TOOL
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 px-2 -mt-4 font-mono uppercase tracking-tighter">
            EXTERNAL_CMD_INTERFACES_FOR_REALTIME_EXEC.
          </p>

          <div className="space-y-4 mt-2">
            {fields.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-dashed border-[#00ff9c]/10 bg-black/20">
                <Wrench className="h-10 w-10 text-zinc-800 mx-auto mb-4" />
                <p className="text-[11px] font-bold text-zinc-600 font-mono uppercase">NO_TOOLS_UPLINKED</p>
                <p className="text-[10px] text-zinc-700 mt-1 font-mono uppercase tracking-tighter">ATTACH_CMD_INTERFACES</p>
              </div>
            ) : (
              fields.map((field, index) => (
                <div key={field.id} className="p-6 bg-black border border-[#00ff9c]/20 rounded-2xl shadow-xl relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <button
                    onClick={() => remove(index)}
                    className="absolute top-5 right-5 p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  
                  <div className="space-y-5 pr-10">
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold tracking-[0.2em] text-zinc-600 uppercase font-mono">PROGRAM_ID</label>
                      <input
                        {...form.register(`tools.${index}.name`)}
                        className="w-full px-4 py-2 text-[13px] font-mono border-b border-[#00ff9c]/10 focus:border-[#00ff9c] outline-none transition-all bg-transparent text-[#00ff9c] placeholder-zinc-800"
                        placeholder="e.g. DATA_QUERY_01"
                      />
                      {form.formState.errors.tools?.[index]?.name && (
                        <p className="text-red-500 text-[9px] mt-1 font-mono">{form.formState.errors.tools[index]?.name?.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold tracking-[0.2em] text-zinc-600 uppercase font-mono">LOGIC_DESC_FOR_AI</label>
                      <textarea
                        {...form.register(`tools.${index}.description`)}
                        rows={2}
                        className="w-full px-4 py-3 text-[12px] bg-black/40 border border-[#00ff9c]/10 rounded-xl text-white focus:border-[#00ff9c]/40 outline-none transition-all resize-none font-mono"
                        placeholder="CMD_EXECUTION_CONTEXT..."
                      />
                      {form.formState.errors.tools?.[index]?.description && (
                        <p className="text-red-500 text-[9px] mt-1 font-mono">{form.formState.errors.tools[index]?.description?.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold tracking-[0.2em] text-zinc-600 uppercase font-mono">UPLINK_REST_PATH</label>
                      <input
                        {...form.register(`tools.${index}.url`)}
                        className="w-full px-4 py-3 text-[12px] font-mono bg-black/40 border border-[#00ff9c]/10 rounded-xl text-[#00ff9c]/60 focus:border-[#00ff9c] outline-none transition-all"
                        placeholder="https://api.node..."
                      />
                      {form.formState.errors.tools?.[index]?.url && (
                        <p className="text-red-500 text-[9px] mt-1 font-mono">{form.formState.errors.tools[index]?.url?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
