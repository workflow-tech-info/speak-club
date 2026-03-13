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
                  <h2 className="text-[28px] font-bold text-white tracking-widest font-mono uppercase">AGENT</h2>
                  <span className="px-2 py-0.5 text-[9px] font-bold text-black bg-[#00ff9c] rounded-full uppercase tracking-widest font-mono">NEW_SYS</span>
                  <button className="flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-[#00ff9c] transition-all ml-2 font-mono uppercase">
                    SYSTEM_UPDATES <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* System Prompt Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button className="group flex items-center gap-1.5 text-[12px] font-bold text-zinc-500 hover:text-[#00ff9c] transition-all font-mono uppercase">
                    SYSTEM_PROMPT <ArrowUpRight className="h-3.5 w-3.5 text-zinc-700 group-hover:text-[#00ff9c]" />
                  </button>
                  <div className="flex items-center gap-4">
                    <button className="p-1.5 text-zinc-500 hover:text-[#00ff9c] bg-white/[0.03] hover:bg-[#00ff9c]/10 rounded-lg transition-all border border-white/5">
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="relative group">
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full min-h-[160px] p-6 text-[13px] font-mono leading-relaxed text-[#00ff9c] bg-black border border-[#00ff9c]/10 rounded-2xl focus:border-[#00ff9c]/40 outline-none transition-all resize-none shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] placeholder:text-zinc-800"
                    placeholder="# Personality_Protocol..."
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button className="p-1.5 text-zinc-600 hover:text-white bg-black/40 hover:bg-black/60 rounded-lg transition-colors border border-white/5">
                      <Expand className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-9 bg-black border border-[#00ff9c]/20 rounded-full p-1 cursor-pointer">
                      <div className="h-3 w-3 bg-[#00ff9c] rounded-full ml-auto shadow-[0_0_8px_rgba(0,255,156,0.5)]" />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-600 uppercase font-mono">DEFAULT_NODE</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-zinc-400 border border-[#00ff9c]/10 rounded-xl hover:bg-[#00ff9c]/5 transition-all font-mono uppercase">
                    <Globe className="h-3.5 w-3.5" strokeWidth={2.5} /> SYNC_ZONE
                  </button>
                </div>
              </div>

              {/* First Message Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[12px] font-bold text-zinc-500 uppercase font-mono tracking-widest">INITIAL_UPLINK</h3>
                </div>
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter">
                  FIRST_CONTACT_PROTOCOL_DATA. 
                  <button className="text-[#00ff9c] font-bold ml-1 inline-flex items-center gap-0.5 group">
                    REQUIREMENTS <ArrowUpRight className="h-3 w-3 text-[#00ff9c]/50 group-hover:text-[#00ff9c] transition-colors" />
                  </button>
                </p>
                
                <div className="relative group">
                  <textarea
                    value={firstMessage}
                    onChange={(e) => setFirstMessage(e.target.value)}
                    className="w-full min-h-[120px] p-6 text-[13px] font-mono leading-relaxed text-[#00ff9c] bg-black border border-[#00ff9c]/10 rounded-2xl focus:border-[#00ff9c]/40 outline-none transition-all resize-none shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]"
                  />
                  <div className="absolute bottom-4 right-4">
                    <button className="p-1.5 text-zinc-600 hover:text-white bg-black/40 hover:bg-black/60 rounded-lg transition-colors border border-white/5">
                      <Expand className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="h-5 w-9 bg-[#00ff9c]/10 border border-[#00ff9c]/30 rounded-full p-1 cursor-pointer">
                    <div className="h-3 w-3 bg-[#00ff9c] rounded-full ml-auto shadow-[0_0_8px_rgba(0,255,156,0.6)]" />
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 uppercase font-mono">INTERRUPT_MODE</span>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-[360px] space-y-8">
              {/* Voices */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[12px] font-bold text-white uppercase font-mono tracking-widest">VOICE_MODELS</h3>
                  <button className="p-1.5 text-zinc-600 hover:text-[#00ff9c]">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter">
                  SELECT_ELEVEN_LABS_NEURAL_UPLINK.
                </p>
                <div className="p-4 bg-black/40 border border-[#00ff9c]/10 rounded-xl flex items-center justify-between shadow-lg group hover:border-[#00ff9c]/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#00ff9c]/5 flex items-center justify-center border border-[#00ff9c]/20">
                      <div className="h-4 w-4 rounded-full bg-[#00ff9c] animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[13px] font-mono text-[#00ff9c] uppercase tracking-tighter italic">Siren_V2.5_Realistic</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-bold text-black bg-[#00ff9c] rounded uppercase font-mono">PRIMARY</span>
                    <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-[#00ff9c]" />
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[11px] font-bold text-zinc-600 hover:text-[#00ff9c] transition-all w-full px-1 font-mono uppercase">
                  <Plus className="h-4 w-4" strokeWidth={3} /> ADD_VOICE_NODE
                </button>
              </div>

              {/* Language */}
              <div className="space-y-4">
                <h3 className="text-[12px] font-bold text-white uppercase font-mono tracking-widest">PROTOCOLS</h3>
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter">
                  DEFAULT_COMM_INTERFACE_LANG.
                </p>
                <div className="p-4 bg-black/40 border border-[#00ff9c]/10 rounded-xl flex items-center justify-between shadow-lg group hover:border-[#00ff9c]/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-lg grayscale group-hover:grayscale-0 transition-all">🇺🇸</span>
                    <span className="text-[13px] font-mono text-white uppercase">ENGLISH_US_V1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase font-mono">DEFAULT</span>
                    <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-[#00ff9c]" />
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[11px] font-bold text-zinc-600 hover:text-[#00ff9c] transition-all w-full px-1 font-mono uppercase">
                  <Plus className="h-4 w-4" strokeWidth={3} /> ADD_PROTOCOL_SUBSET
                </button>
              </div>

              {/* LLM */}
              <div className="space-y-4">
                <h3 className="text-[12px] font-bold text-white uppercase font-mono tracking-widest">LOGIC_ENGINE</h3>
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter">
                  SELECT_NEURAL_UPLINK_PROVIDER.
                </p>
                <div className="p-4 bg-black/40 border border-[#00ff9c]/10 rounded-xl flex items-center justify-between shadow-lg group hover:border-[#00ff9c]/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#00ff9c]/5 flex items-center justify-center border border-[#00ff9c]/20">
                      <Cpu className="h-4 w-4 text-[#00ff9c]" />
                    </div>
                    <p className="text-[13px] font-mono text-[#00ff9c] uppercase">Qwen3-30B-A3B</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-[#00ff9c]" />
                </div>
              </div>
            </div>
          </div>
        );
      case "Workflow":
        return (
          <div className="flex flex-col lg:flex-row gap-0 -m-10 h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Main Canvas Area */}
            <div className="flex-1 bg-black relative overflow-hidden border-r border-[#00ff9c]/10 matrix-grid opacity-80">
              {/* Toolbar */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 p-2 bg-black/80 backdrop-blur-md border border-[#00ff9c]/20 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <button className="p-2 text-zinc-400 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all"><ZoomIn className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-400 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all"><ZoomOut className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-400 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all"><Maximize2 className="h-4 w-4" /></button>
                <div className="w-px h-4 bg-[#00ff9c]/20 mx-1" />
                <button className="p-2 text-zinc-400 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all"><MousePointer2 className="h-4 w-4" /></button>
                <button className="p-2 text-zinc-400 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all"><Hand className="h-4 w-4" /></button>
                <div className="w-px h-4 bg-[#00ff9c]/20 mx-1" />
                <button className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-zinc-400 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all font-mono uppercase">
                  <LayoutTemplate className="h-4 w-4" />
                  TEMPLATES
                  <div className="h-1.5 w-1.5 bg-[#00ff9c] rounded-full shadow-[0_0_5px_rgba(0,255,156,0.8)]" />
                </button>
              </div>

              {/* Workflow Diagram Mockup */}
              <div className="absolute inset-0 flex flex-col items-center pt-24 space-y-12">
                {/* Start Node */}
                <div className="flex flex-col items-center">
                  <div className="px-4 py-2 bg-[#00ff9c]/10 border border-[#00ff9c]/30 rounded-lg shadow-[0_0_10px_rgba(0,255,156,0.1)] flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold text-[#00ff9c] font-mono uppercase tracking-widest">🚩 UPLINK_INIT</span>
                  </div>
                  <div className="w-px h-8 bg-[#00ff9c]/20" />
                  <div className="p-5 bg-black border border-[#00ff9c]/40 rounded-2xl shadow-[0_0_30px_rgba(0,255,156,0.1)] flex flex-col items-center gap-2 min-w-[220px]">
                    <div className="flex items-center gap-3">
                       <div className="h-6 w-6 bg-[#00ff9c]/10 rounded-full flex items-center justify-center border border-[#00ff9c]/20">
                         <span className="text-[10px] animate-pulse">👤</span>
                       </div>
                       <span className="text-[11px] font-bold text-white font-mono uppercase tracking-tighter">GREET_IDENT_INTENT</span>
                    </div>
                  </div>
                </div>

                {/* Branches */}
                <div className="flex gap-12 relative w-full justify-center">
                  {/* Branch Arrows (stylized) */}
                  <svg className="absolute -top-12 inset-x-0 w-full h-12 text-[#00ff9c]/20 pointer-events-none" preserveAspectRatio="none">
                    <path d="M 50% 0 L 50% 12 M 50% 6 L 30% 6 L 30% 36 M 50% 6 L 70% 6 L 70% 36" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  
                  {/* Answer FAQ Branch */}
                  <div className="flex flex-col items-center space-y-8 mt-12">
                    <div className="px-3 py-1 bg-[#00ff9c] rounded-full text-[9px] font-black text-black tracking-widest font-mono uppercase">CALLER_REQ_FAQ</div>
                    <div className="p-5 bg-black/80 border border-[#00ff9c]/20 rounded-2xl shadow-lg flex flex-col items-center gap-2 min-w-[190px]">
                      <div className="flex items-center gap-3">
                         <div className="h-6 w-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                           <span className="text-[10px]">❓</span>
                         </div>
                         <span className="text-[11px] font-bold text-zinc-300 font-mono uppercase italic">ANSWER_FAQ</span>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Call Branch */}
                  <div className="flex flex-col items-center space-y-8 mt-12">
                    <div className="px-3 py-1 bg-[#00ff9c] rounded-full text-[9px] font-black text-black tracking-widest font-mono uppercase">RE_ROUTE_HUMAN</div>
                    <div className="p-5 bg-black/80 border border-[#00ff9c]/20 rounded-2xl shadow-lg flex flex-col items-center gap-2 min-w-[190px]">
                      <div className="flex items-center gap-3">
                         <div className="h-6 w-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                           <span className="text-[10px]">📞</span>
                         </div>
                         <span className="text-[11px] font-bold text-zinc-300 font-mono uppercase italic">TRANS_CALL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[360px] bg-black p-8 space-y-8 border-l border-[#00ff9c]/10">
              <h3 className="text-[18px] font-bold text-white font-mono uppercase tracking-widest">NODE_PROTOCOL</h3>
              
              <div className="p-5 bg-[#00ff9c]/5 border border-[#00ff9c]/20 rounded-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-[#00ff9c]/10">
                  <div className="h-1 w-1 bg-[#00ff9c] animate-ping" />
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-5 w-5 rounded-lg border border-[#00ff9c]/40 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#00ff9c] font-mono">i</span>
                  </div>
                  <p className="text-[11px] font-bold text-zinc-400 leading-relaxed font-mono uppercase tracking-tighter">
                    DEACTIVATE_WORKFLOW: DISCONNECT_START_NODE
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#00ff9c]/20 transition-all cursor-pointer">
                <div className="space-y-1">
                  <h4 className="text-[12px] font-bold text-zinc-300 font-mono uppercase">PREVENT_LOOP</h4>
                  <p className="text-[10px] text-zinc-600 font-mono uppercase leading-normal tracking-tighter">
                    HALT_INFINITE_TRANSITIONS
                  </p>
                </div>
                <div className="h-5 w-9 bg-zinc-900 border border-zinc-800 rounded-full p-1 cursor-pointer">
                  <div className="h-3 w-3 bg-zinc-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );
      case "Knowledge Base":
        return (
          <div className="p-10 max-w-[1200px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-[24px] font-bold text-white font-mono uppercase tracking-widest">DATA_STORAGE</h2>
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter mt-1">ATTACH_LOCAL_KNOWLEDGE_FILES_TO_NODE.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 text-[11px] font-bold text-zinc-400 hover:text-[#00ff9c] border border-[#00ff9c]/10 rounded-xl transition-all font-mono uppercase">
                  CONFIG_RAG
                </button>
                <button className="px-5 py-2.5 text-[11px] font-bold text-black bg-[#00ff9c] rounded-xl hover:bg-[#00e68d] transition-all font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,156,0.2)]">
                  UPLINK_DOC
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-800 group-focus-within:text-[#00ff9c] transition-colors" />
                <input
                  type="text"
                  placeholder="SEARCH_NODE_INDEX..."
                  className="w-full pl-12 pr-4 py-4 bg-black border border-[#00ff9c]/10 rounded-2xl focus:border-[#00ff9c]/40 outline-none transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-[13px] font-mono text-[#00ff9c] placeholder:text-zinc-900"
                />
              </div>

              <div className="pt-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className="h-20 w-20 bg-black border border-[#00ff9c]/5 rounded-2xl flex items-center justify-center mb-2 shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[#00ff9c]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <FolderOpen className="h-8 w-8 text-zinc-800 group-hover:text-[#00ff9c] transition-all duration-500 scale-90 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white font-mono uppercase tracking-widest">ZERO_DATA_DETECTED</h3>
                  <p className="text-[11px] text-zinc-700 mt-2 font-mono uppercase tracking-tighter">NO_LOCAL_PROTOCOLS_ATTACHED_TO_THIS_NEURAL_INTERFACE.</p>
                </div>
                <button className="px-8 py-3 bg-[#00ff9c]/5 text-[#00ff9c] text-[11px] font-bold rounded-xl border border-[#00ff9c]/20 hover:bg-[#00ff9c]/10 transition-all font-mono uppercase tracking-[0.2em] shadow-lg">
                  INITIATE_UPLINK
                </button>
              </div>
            </div>
          </div>
        );
      case "Tools":
        return (
          <div className="p-10 max-w-[1200px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-[24px] font-bold text-white font-mono uppercase tracking-widest">EXTERNAL_INTERFACES</h2>
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter mt-1">CONNECT_REMOTE_CMD_PROTOCOLS_FOR_REALTIME_EXEC.</p>
              </div>
              <button className="px-5 py-2.5 text-[11px] font-bold text-black bg-[#00ff9c] rounded-xl hover:bg-[#00e68d] transition-all flex items-center gap-2 font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,156,0.2)]">
                <Plus className="h-4 w-4" /> CREATE_INTERFACE
              </button>
            </div>

            <div className="grid gap-6">
              {[
                { name: "INV_SYNC", type: "REST_API", status: "ACTIVE", desc: "Live uplink to centralized logistics database protocols." },
                { name: "RESERVE_NODE", type: "WEBHOOK", status: "STANDBY", desc: "Execution of booking instructions via n8n integration." },
                { name: "USER_SCAN", type: "MCP_CORE", status: "DEV_MODE", desc: "Retrieval of identity data and lifetime loyalty markers." }
              ].map((tool) => (
                <div key={tool.name} className="p-6 bg-black border border-[#00ff9c]/10 rounded-2xl flex items-center justify-between shadow-xl group hover:border-[#00ff9c]/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-[#00ff9c]/5 border border-[#00ff9c]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00ff9c]/10 transition-all">
                      <Code2 className="h-5 w-5 text-[#00ff9c]/40 group-hover:text-[#00ff9c] transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-[14px] font-bold text-white font-mono uppercase tracking-tighter italic">{tool.name}</h3>
                        <span className="px-2 py-0.5 text-[9px] font-bold text-[#00ff9c] bg-[#00ff9c]/10 border border-[#00ff9c]/20 rounded uppercase font-mono">{tool.type}</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter mt-1 italic">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${tool.status === 'ACTIVE' || tool.status === 'STANDBY' ? 'bg-[#00ff9c] shadow-[0_0_8px_rgba(0,255,156,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                      <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase italic">{tool.status}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-800 group-hover:text-[#00ff9c] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Tests":
        return (
          <div className="p-10 max-w-[1200px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-[24px] font-bold text-white font-mono uppercase tracking-widest">QUALITY_METRICS</h2>
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-tighter mt-1">SIMULATE_INTERACTION_MODELS_TO_VERIFY_INTEGRITY.</p>
              </div>
              <button className="px-5 py-2.5 text-[11px] font-bold text-black bg-[#00ff9c] rounded-xl hover:bg-[#00e68d] transition-all flex items-center gap-2 font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,156,0.2)]">
                <Play className="h-4 w-4" /> EXECUTE_SUITE
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8 bg-black border border-[#00ff9c]/10 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[13px] font-bold text-[#00ff9c] font-mono uppercase tracking-widest italic">STANDARD_VAL_04</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00ff9c] animate-pulse" />
                    <span className="px-2 py-0.5 text-[10px] font-bold text-[#00ff9c] bg-[#00ff9c]/10 border border-[#00ff9c]/30 rounded-full font-mono uppercase">VERIFIED</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {["GREETING_PROTOCOL", "APPOINTMENT_LOGIC", "DATA_RETRIEVAL", "TRANSFER_INIT"].map(test => (
                    <div key={test} className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.03] pb-3">
                      <span className="text-zinc-500 uppercase">{test}</span>
                      <div className="h-5 w-5 bg-[#00ff9c]/10 border border-[#00ff9c]/40 rounded-full flex items-center justify-center">
                        <span className="text-[8px] text-[#00ff9c] font-black">✓</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-black border border-[#00ff9c]/10 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[13px] font-bold text-white font-mono uppercase tracking-widest italic">NEURAL_DYNAMICS</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-zinc-600 bg-white/[0.03] rounded-full font-mono uppercase">LATEST_SYNC</span>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono uppercase mb-2 tracking-tighter">
                      <span className="text-zinc-600">LATENCY_PROTOCOL</span>
                      <span className="font-bold text-[#00ff9c]">240_MS</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full w-[85%] bg-gradient-to-r from-zinc-800 to-[#00ff9c] rounded-full shadow-[0_0_8px_rgba(0,255,156,0.3)]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono uppercase mb-2 tracking-tighter">
                      <span className="text-zinc-600">INTENT_ACCURACY</span>
                      <span className="font-bold text-[#00ff9c]">94.2_%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full w-[94%] bg-gradient-to-r from-zinc-800 to-[#00ff9c] rounded-full shadow-[0_0_8px_rgba(0,255,156,0.3)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Analysis":
        return (
          <div className="p-10 max-w-[1200px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[24px] font-bold text-white font-mono uppercase tracking-widest mb-10">NEURAL_ANALYTICS</h2>
            
            <div className="grid sm:grid-cols-3 gap-8 mb-10">
              {[
                { label: "SUCC_PROTOCOL", value: "88%", color: "text-[#00ff9c]" },
                { label: "USER_UPLINK_VAL", value: "4.8/5", color: "text-[#00ff9c]" },
                { label: "AVG_SYNC_DUR", value: "1M 42S", color: "text-zinc-500" }
              ].map(stat => (
                <div key={stat.label} className="p-6 bg-black border border-[#00ff9c]/10 rounded-2xl shadow-xl flex flex-col items-center text-center">
                  <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em] mb-3 font-mono">{stat.label}</p>
                  <p className={`text-[28px] font-black ${stat.color} font-mono tracking-tighter`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-black border border-[#00ff9c]/10 rounded-2xl shadow-xl">
              <h3 className="text-[13px] font-bold text-white font-mono uppercase tracking-widest mb-8">TOPIC_DIST_MATRIX</h3>
              <div className="space-y-6">
                {[
                  { topic: "BILLING_DATA", percent: 45, color: "bg-[#00ff9c]/80" },
                  { topic: "TECH_SPECS", percent: 30, color: "bg-[#00ff9c]/50" },
                  { topic: "MGMT_PROTOCOLS", percent: 15, color: "bg-[#00ff9c]/30" },
                  { topic: "MISC_UPLINKS", percent: 10, color: "bg-zinc-900" }
                ].map(item => (
                  <div key={item.topic}>
                    <div className="flex justify-between text-[10px] font-mono uppercase mb-2 tracking-tighter">
                      <span className="text-zinc-600">{item.topic}</span>
                      <span className="text-[#00ff9c] font-bold">{item.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                      <div className={`h-full ${item.color} rounded-full shadow-[0_0_5px_rgba(0,255,156,0.2)]`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Security":
        return (
          <div className="p-10 max-w-[1200px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[24px] font-bold text-white font-mono uppercase tracking-widest mb-10">SECURITY_PROTOCOLS</h2>
            
            <div className="space-y-6">
              {[
                { title: "PII_REDACTION", desc: "AUT_MASK_SENSITIVE_DATA_VECTORS_IN_TRANSCRIPT_LOGS.", enabled: true },
                { title: "AES_UPLINK_ENCRYPT", desc: "ENCRYPT_AND_STORE_ALL_NODE_INTERACTIONS_FOR_QA_REVIEWS.", enabled: true },
                { title: "VOCAL_BIOMETRICS", desc: "VERIFY_IDENTITY_VIA_UNIQUE_NEURAL_VOICE_SIGNATURES.", enabled: false },
                { title: "GEO_ISO_UPLINK", desc: "LOCALIZE_DATA_RESIDENCY_WITHIN_RESTRICTED_PROTOCOL_ZONES.", enabled: true }
              ].map(item => (
                <div key={item.title} className="p-6 bg-black border border-[#00ff9c]/10 rounded-2xl flex items-center justify-between shadow-xl group hover:border-[#00ff9c]/30 transition-all">
                  <div className="max-w-[70%]">
                    <h3 className="text-[15px] font-bold text-white font-mono uppercase tracking-tighter italic">{item.title}</h3>
                    <p className="text-[11px] text-zinc-600 mt-2 leading-relaxed font-mono uppercase tracking-tighter italic opacity-60">{item.desc}</p>
                  </div>
                  <div className={`h-6 w-11 rounded-full p-1 cursor-pointer transition-all ${item.enabled ? 'bg-[#00ff9c]/20 border border-[#00ff9c]/40' : 'bg-zinc-900 border border-white/5'}`}>
                    <div className={`h-4 w-4 rounded-full transition-all shadow-[0_0_8px_rgba(0,0,0,0.4)] ${item.enabled ? 'ml-auto bg-[#00ff9c] shadow-[0_0_10px_rgba(0,255,156,0.6)]' : 'ml-0 bg-zinc-700'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-32 text-center animate-in fade-in duration-500">
            <div className="h-24 w-24 bg-black border border-[#00ff9c]/5 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl relative group">
              <div className="absolute inset-0 bg-[#00ff9c]/5 animate-pulse rounded-3xl" />
              <Info className="h-10 w-10 text-[#00ff9c]/20 group-hover:text-[#00ff9c] transition-all duration-700" />
            </div>
            <h3 className="text-[16px] font-bold text-white font-mono uppercase tracking-widest">NODE_UNDER_CONSTRUCTION</h3>
            <p className="text-[11px] text-zinc-600 mt-3 max-w-[340px] mx-auto font-mono uppercase tracking-tighter leading-relaxed">
              THE <span className="text-[#00ff9c]">{activeTab}</span> PROTOCOL IS CURRENTLY BEING OPTIMIZED FOR NEURAL INTERFACE COMPATIBILITY.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent -m-8">
      {/* ── Top Header ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 bg-black/40 backdrop-blur-md border-b border-[#00ff9c]/10 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Link href="/agents" className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-[#00ff9c] transition-all">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#00ff9c] animate-pulse" />
            <h1 className="text-[14px] font-bold text-white font-mono uppercase tracking-widest truncate">{initialData.agent_name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <span className="shrink-0 px-2.5 py-1 text-[9px] font-bold text-[#00ff9c] bg-[#00ff9c]/10 border border-[#00ff9c]/20 rounded-md uppercase tracking-widest font-mono">NODE_PUBLIC</span>
          <button className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-mono uppercase tracking-tighter">
            <Code2 className="h-3.5 w-3.5" />
            VARS
          </button>
          <button className="hidden md:flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-mono uppercase tracking-tighter">
            <History className="h-3.5 w-3.5" />
            VERSIONS
          </button>
          <button className="shrink-0 flex items-center justify-center gap-1.5 px-6 py-2 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)] font-mono uppercase tracking-widest">
            PREVIEW
          </button>
          <button className="shrink-0 p-2 text-zinc-600 hover:text-[#00ff9c] transition-all">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────── */}
      <div className="flex items-center gap-1 px-4 bg-black/20 backdrop-blur-sm border-b border-[#00ff9c]/5 overflow-x-auto scrollbar-hide sticky top-0 z-20">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-4 text-[11px] font-bold transition-all relative whitespace-nowrap font-mono uppercase tracking-widest",
              activeTab === tab ? "text-[#00ff9c]" : "text-zinc-600 hover:text-zinc-400"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00ff9c] shadow-[0_0_10px_rgba(0,255,156,0.5)] transition-all" />
            )}
          </button>
        ))}
      </div>

      {/* ── Content Area ─────────────────────────── */}
      <div className="p-4 sm:p-10 max-w-[1400px] mx-auto min-h-[calc(100vh-120px)]">
        {renderContent()}
      </div>
    </div>
  );
}
