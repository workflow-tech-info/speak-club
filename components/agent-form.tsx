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
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* ── Sticky Header ───────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-card-border)] pb-4 pt-6 mb-6 flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-4">
          <Link href="/agents" className="p-2 -ml-2 rounded-xl hover:bg-zinc-200/50 text-zinc-500 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-zinc-900">
              {isEditing ? "Edit Agent" : "Create New Agent"}
            </h1>
            <p className="mt-0.5 text-[13px] text-zinc-400">
              {isEditing ? `Managing ${initialData?.agent_name}` : "Configure voice, instructions, and tools"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl transition-colors shadow-sm">
            <Play className="h-4 w-4" />
            Test Call
          </button>
          <button 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column (Config) ───────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <h2 className="text-[15px] font-bold text-zinc-900 mb-5">Basic Configuration</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Agent Name</label>
                  <input
                    {...form.register("agent_name")}
                    className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50/50 focus:bg-white outline-none transition-all"
                    placeholder="e.g. Booking Assistant"
                  />
                  {form.formState.errors.agent_name && (
                    <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.agent_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Voice Selection</label>
                  <select
                    {...form.register("voice_id")}
                    className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50/50 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="11labs-rachel">ElevenLabs - Rachel (Female, Calm)</option>
                    <option value="11labs-adam">ElevenLabs - Adam (Male, Confident)</option>
                    <option value="openai-alloy">OpenAI - Alloy (Neutral)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Description (Internal)</label>
                <input
                  {...form.register("description")}
                  className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50/50 focus:bg-white outline-none transition-all"
                  placeholder="What is this agent used for?"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5 flex justify-between">
                  <span>System Prompt</span>
                  <span className="text-zinc-400 font-normal">Core Instructions</span>
                </label>
                <textarea
                  {...form.register("system_prompt")}
                  rows={12}
                  className="w-full px-4 py-3 text-[13px] leading-relaxed border border-zinc-200 rounded-xl bg-zinc-50/50 focus:bg-white outline-none transition-all shadow-inner resize-y font-mono"
                  placeholder="You are an AI assistant for [company]. Your job is to..."
                />
                {form.formState.errors.system_prompt && (
                  <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.system_prompt.message}</p>
                )}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-[15px] font-bold text-zinc-900 mb-1">Post-Call Automation</h2>
            <p className="text-[12px] text-zinc-400 mb-5">Trigger workflows in n8n after the call ends</p>
            
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5 flex items-center gap-2">
                <Webhook className="h-3.5 w-3.5" /> Post-Call Webhook URL
              </label>
              <input
                {...form.register("post_call_webhook_url")}
                className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50/50 focus:bg-white outline-none transition-all font-mono"
                placeholder="https://you-n8n.com/webhook/..."
              />
              {form.formState.errors.post_call_webhook_url && (
                <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.post_call_webhook_url.message}</p>
              )}
            </div>
          </GlassCard>
        </div>

        {/* ── Right Column (Tools) ────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[15px] font-bold text-zinc-900">Custom Tools</h2>
            <button
              onClick={() => append({ name: "", description: "", url: "" })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-blue-600 bg-blue-50/50 hover:bg-blue-100/50 rounded-lg transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Tool
            </button>
          </div>
          <p className="text-[12px] text-zinc-400 px-1 -mt-3">
            Functions the AI can call mid-conversation to fetch data or trigger actions via n8n.
          </p>

          <div className="space-y-4 mt-2">
            {fields.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border-2 border-dashed border-zinc-200">
                <Wrench className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-[12px] font-medium text-zinc-500">No tools configured</p>
                <p className="text-[11px] text-zinc-400 mt-1">Add a tool to let your AI take action.</p>
              </div>
            ) : (
              fields.map((field, index) => (
                <div key={field.id} className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-sm relative group animate-fade-in-up">
                  <button
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  
                  <div className="space-y-4 pr-8">
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-1.5">Tool Name</label>
                      <input
                        {...form.register(`tools.${index}.name`)}
                        className="w-full px-3 py-2 text-[13px] font-medium border-b border-zinc-200 focus:border-blue-400 outline-none transition-colors bg-transparent placeholder-zinc-300"
                        placeholder="e.g. check_availability"
                      />
                      {form.formState.errors.tools?.[index]?.name && (
                        <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.tools[index]?.name?.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-1.5">Description to AI</label>
                      <textarea
                        {...form.register(`tools.${index}.description`)}
                        rows={2}
                        className="w-full px-3 py-2 text-[12px] border border-zinc-200 rounded-xl bg-zinc-50/50 focus:bg-white outline-none transition-all resize-none shadow-inner"
                        placeholder="When to use this tool..."
                      />
                      {form.formState.errors.tools?.[index]?.description && (
                        <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.tools[index]?.description?.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-1.5">n8n Webhook URL</label>
                      <input
                        {...form.register(`tools.${index}.url`)}
                        className="w-full px-3 py-2 text-[12px] font-mono border border-zinc-200 rounded-xl bg-zinc-50/50 focus:bg-white outline-none transition-all"
                        placeholder="https://..."
                      />
                      {form.formState.errors.tools?.[index]?.url && (
                        <p className="text-red-500 text-[10px] mt-1">{form.formState.errors.tools[index]?.url?.message}</p>
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
