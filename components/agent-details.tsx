"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Settings, 
  ChevronRight, 
  Code2, 
  History, 
  Play, 
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  Sparkles,
  Expand,
  Globe,
  Globe2,
  Cpu,
  Type,
  Maximize2,
  Search,
  FolderOpen,
  Info,
  LayoutTemplate,
  ZoomIn,
  ZoomOut,
  MousePointer2,
  Link2,
  GripHorizontal,
  Hand
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  "Agent", "Workflow", "Knowledge Base", "Analysis", "Tools", "Tests", "Widget", "Security", "Advanced"
];

interface AgentDetailsProps {
  initialData: any;
}

export function AgentDetails({ initialData }: AgentDetailsProps) {
  const [activeTab, setActiveTab] = useState("Agent");
  const [systemPrompt, setSystemPrompt] = useState(initialData.system_prompt || "");
  const [firstMessage, setFirstMessage] = useState("Hi, thanks for calling... this is Sam, how can I help you?");

  const renderContent = () => {
    switch (activeTab) {
      case "Agent":
        return (
          <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Main Content Area */}
            <div className="flex-1 space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-[28px] font-bold text-zinc-900 tracking-tight">Agent</h2>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-zinc-900 rounded-full uppercase tracking-wider">New</span>
                  <button className="flex items-center gap-1 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors ml-2">
                    View new features <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* System Prompt Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button className="group flex items-center gap-1.5 text-[14px] font-bold text-zinc-700 hover:text-zinc-900 transition-colors">
                    System prompt <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-600" />
                  </button>
                  <div className="flex items-center gap-4">
                    <button className="p-1.5 text-zinc-400 hover:text-zinc-600 bg-zinc-100/50 hover:bg-zinc-100 rounded-lg transition-colors">
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="relative group">
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full min-h-[160px] p-6 text-[14px] leading-relaxed text-zinc-800 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900/5 outline-none transition-all resize-none shadow-sm"
                    placeholder="# Personality..."
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button className="p-1.5 text-zinc-400 hover:text-zinc-600 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors">
                      <Expand className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-9 bg-zinc-900 rounded-full p-1 cursor-pointer">
                      <div className="h-3 w-3 bg-white rounded-full ml-auto" />
                    </div>
                    <span className="text-[13px] font-medium text-zinc-500">Default personality</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-zinc-700 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
                    <Globe className="h-3.5 w-3.5" strokeWidth={2.5} /> Set timezone
                  </button>
                </div>
              </div>

              {/* First Message Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-bold text-zinc-700">First message</h3>
                </div>
                <p className="text-[13px] text-zinc-500 -mt-2">
                  The first message the agent will say. If empty, the agent will wait for the user to start the conversation. 
                  <button className="text-zinc-900 font-bold ml-1 inline-flex items-center gap-0.5 group">
                    Disclosure Requirements <ArrowUpRight className="h-3 w-3 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                  </button>
                </p>
                
                <div className="relative group">
                  <textarea
                    value={firstMessage}
                    onChange={(e) => setFirstMessage(e.target.value)}
                    className="w-full min-h-[120px] p-6 text-[14px] leading-relaxed text-zinc-800 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900/5 outline-none transition-all resize-none shadow-sm"
                  />
                  <div className="absolute bottom-4 right-4">
                    <button className="p-1.5 text-zinc-400 hover:text-zinc-600 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors">
                      <Expand className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="h-5 w-9 bg-zinc-900 rounded-full p-1 cursor-pointer">
                    <div className="h-3 w-3 bg-white rounded-full ml-auto" />
                  </div>
                  <span className="text-[13px] font-medium text-zinc-500">Interruptible</span>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-[360px] space-y-8">
              {/* Voices */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-bold text-zinc-900">Voices</h3>
                  <button className="p-1.5 text-zinc-400 hover:text-zinc-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[12px] text-zinc-500 -mt-2 leading-relaxed">
                  Select the ElevenLabs voices you want to use for the agent.
                </p>
                <div className="p-3 bg-white border border-zinc-200 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                      <div className="h-4 w-4 rounded-full bg-red-400 opacity-50 blur-[2px]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">Siren - Natural realistic...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 bg-zinc-100 rounded text-center">Primary</span>
                    <div className="h-4 w-4 rounded-full border border-green-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-300" />
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[13px] font-bold text-zinc-400 hover:text-zinc-600 transition-colors w-full px-1">
                  <Plus className="h-4 w-4" strokeWidth={3} /> Add additional voice
                </button>
              </div>

              {/* Language */}
              <div className="space-y-4">
                <h3 className="text-[14px] font-bold text-zinc-900">Language</h3>
                <p className="text-[12px] text-zinc-500 -mt-2 leading-relaxed">
                  Choose the default and additional languages the agent will communicate in.
                </p>
                <div className="p-4 bg-white border border-zinc-200 rounded-xl flex items-center justify-between shadow-sm cursor-pointer hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-[13px] font-bold text-zinc-900">English</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-zinc-400">Default</span>
                    <ChevronRight className="h-4 w-4 text-zinc-300" />
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[13px] font-bold text-zinc-400 hover:text-zinc-600 transition-colors w-full px-1">
                  <Plus className="h-4 w-4" strokeWidth={3} /> Add additional languages
                </button>
              </div>

              {/* LLM */}
              <div className="space-y-4">
                <h3 className="text-[14px] font-bold text-zinc-900">LLM</h3>
                <p className="text-[12px] text-zinc-500 -mt-2 leading-relaxed">
                  Select which provider and model to use for the LLM.
                </p>
                <div className="p-4 bg-white border border-zinc-200 rounded-xl flex items-center justify-between shadow-sm cursor-pointer hover:bg-zinc-50 transition-colors">
                  <div>
                    <p className="text-[13px] font-bold text-zinc-900">Qwen3-30B-A3B</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-300" />
                </div>
              </div>
            </div>
          </div>
        );
      case "Workflow":
        return (
          <div className="flex flex-col lg:flex-row gap-0 -m-8 h-[calc(100vh-113px)] animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Main Canvas Area */}
            <div className="flex-1 bg-[#F9FAFB] relative overflow-hidden border-r border-zinc-200">
              {/* Toolbar */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 p-1.5 bg-white border border-zinc-200 rounded-xl shadow-sm">
                <button className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-lg transition-colors"><ZoomIn className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-lg transition-colors"><ZoomOut className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-lg transition-colors"><Maximize2 className="h-4 w-4" /></button>
                <div className="w-px h-4 bg-zinc-200 mx-1" />
                <button className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-lg transition-colors"><MousePointer2 className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-lg transition-colors"><Hand className="h-4 w-4" /></button>
                <div className="w-px h-4 bg-zinc-200 mx-1" />
                <button className="flex items-center gap-2 px-3 py-2 text-[13px] font-semibold text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors">
                  <LayoutTemplate className="h-4 w-4" />
                  Templates
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                </button>
              </div>

              {/* Workflow Diagram Mockup */}
              <div className="absolute inset-0 flex flex-col items-center pt-24 space-y-12">
                {/* Start Node */}
                <div className="flex flex-col items-center">
                  <div className="px-4 py-2 bg-white border border-zinc-200 rounded-lg shadow-sm flex items-center gap-2 mb-4">
                    <span className="text-[12px] font-bold text-zinc-600">🚩 Start</span>
                  </div>
                  <div className="w-px h-8 bg-zinc-200" />
                  <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col items-center gap-2 min-w-[200px]">
                    <div className="flex items-center gap-2">
                       <div className="h-5 w-5 bg-zinc-100 rounded-full flex items-center justify-center">
                         <span className="text-[10px]">👤</span>
                       </div>
                       <span className="text-[13px] font-semibold text-zinc-900">Greeting & Identify Intent</span>
                    </div>
                  </div>
                </div>

                {/* Branches */}
                <div className="flex gap-12 relative w-full justify-center">
                  {/* Branch Arrows (stylized) */}
                  <svg className="absolute -top-12 inset-x-0 w-full h-12 text-zinc-200 pointer-events-none" preserveAspectRatio="none">
                    <path d="M 50% 0 L 50% 12 M 50% 6 L 30% 6 L 30% 36 M 50% 6 L 70% 6 L 70% 36" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  
                  {/* Answer FAQ Branch */}
                  <div className="flex flex-col items-center space-y-8 mt-12">
                    <div className="px-3 py-1 bg-zinc-900 rounded-full text-[11px] font-bold text-white tracking-tight">The caller has a general questi...</div>
                    <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex flex-col items-center gap-2 min-w-[180px]">
                      <div className="flex items-center gap-2">
                         <div className="h-5 w-5 bg-zinc-100 rounded-full flex items-center justify-center">
                           <span className="text-[10px]">❓</span>
                         </div>
                         <span className="text-[13px] font-semibold text-zinc-900">Answer FAQ</span>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Call Branch */}
                  <div className="flex flex-col items-center space-y-8 mt-12">
                    <div className="px-3 py-1 bg-zinc-900 rounded-full text-[11px] font-bold text-white tracking-tight">The caller wants to speak with ...</div>
                    <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm flex flex-col items-center gap-2 min-w-[180px]">
                      <div className="flex items-center gap-2">
                         <div className="h-5 w-5 bg-zinc-100 rounded-full flex items-center justify-center">
                           <span className="text-[10px]">📞</span>
                         </div>
                         <span className="text-[13px] font-semibold text-zinc-900">Transfer Call</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[360px] bg-white p-8 space-y-8">
              <h3 className="text-[20px] font-bold text-zinc-900">Global settings</h3>
              
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-4 w-4 rounded-full border border-zinc-400 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-zinc-600">i</span>
                  </div>
                  <p className="text-[13px] font-medium text-zinc-700 leading-relaxed">
                    To disable a workflow, disconnect the start node
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-[14px] font-bold text-zinc-900">Prevent infinite loops</h4>
                  <p className="text-[12px] text-zinc-400 leading-normal">
                    Prevents the workflow from continuously transitioni... <br/>
                    a loop when all conditions are true.
                  </p>
                </div>
                <div className="h-5 w-9 bg-zinc-100 rounded-full p-1 cursor-pointer">
                  <div className="h-3 w-3 bg-zinc-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );
      case "Knowledge Base":
        return (
          <div className="p-8 max-w-[1000px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[24px] font-bold text-zinc-900">Agent Knowledge Base</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 border border-zinc-200 rounded-xl transition-colors">
                  Configure RAG
                </button>
                <button className="px-4 py-2 text-[13px] font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors">
                  Add document
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search Knowledge Base..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 outline-none transition-all shadow-sm text-[14px]"
                />
              </div>

              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-zinc-500 hover:text-zinc-700 border border-zinc-200 rounded-lg transition-colors">
                <Plus className="h-3.5 w-3.5" />
                Type
              </button>

              <div className="pt-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-12 w-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-2">
                  <FolderOpen className="h-6 w-6 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-zinc-900">No documents found</h3>
                  <p className="text-[13px] text-zinc-500 mt-1">This agent has no attached documents yet.</p>
                </div>
                <button className="px-6 py-2.5 bg-zinc-900 text-white text-[13px] font-bold rounded-xl hover:bg-zinc-800 transition-colors">
                  Add document
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-12 text-center text-zinc-400 animate-in fade-in duration-300">
            Content for {activeTab} coming soon...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] -m-8">
      {/* ── Top Header ───────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-zinc-200">
        <div className="flex items-center gap-4">
          <Link href="/agents" className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-zinc-900" />
            <h1 className="text-[14px] font-semibold text-zinc-900">{initialData.agent_name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-[11px] font-medium text-zinc-500 bg-zinc-100 rounded-md">Public</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-zinc-700 hover:bg-zinc-50 border border-zinc-200 rounded-lg transition-colors">
            <Code2 className="h-3.5 w-3.5" />
            Variables
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-zinc-700 hover:bg-zinc-50 border border-zinc-200 rounded-lg transition-colors">
            <History className="h-3.5 w-3.5" />
            Enable Versioning
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors">
            Preview
          </button>
          <button className="p-1.5 text-zinc-400 hover:text-zinc-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────── */}
      <div className="flex items-center gap-1 px-4 bg-white border-b border-zinc-200 overflow-x-auto scollbar-hide sticky top-0 z-20">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-3 text-[13px] font-medium transition-colors relative whitespace-nowrap",
              activeTab === tab ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 transition-all" />
            )}
          </button>
        ))}
      </div>

      {/* ── Content Area ─────────────────────────── */}
      <div className="p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-113px)]">
        {renderContent()}
      </div>
    </div>
  );
}
