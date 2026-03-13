import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, BarChart3, Clock, AlertCircle } from "lucide-react";
import { StatusPill } from "./status-pill";
import type { CallLog } from "@/lib/mock-data";

interface CallDrawerProps {
  call: CallLog | null;
  isOpen: boolean;
  onClose: () => void;
}

// No longer using global mockTranscript, using call.transcript

export function CallDrawer({ call, isOpen, onClose }: CallDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="relative w-full sm:max-w-lg bg-[#050505] h-full shadow-[0_0_50px_rgba(0,0,0,0.5)] border-l border-white/5 flex flex-col z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.01]">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-[#00ff9c] uppercase font-mono">CALL_LOG_DECRYPTED</h2>
              <p className="text-[11px] text-zinc-600 mt-1 font-mono uppercase tracking-tighter">ID: {call?.id || "NULL"}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-zinc-500 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Duration', value: call?.duration, icon: Clock },
                  { label: 'Status', value: call && <StatusPill variant={call.status} />, icon: AlertCircle },
                  { label: 'Sentiment', value: call && <StatusPill variant={call.sentiment} />, icon: BarChart3 },
                  { label: 'Agent_Auth', value: call?.agentName, icon: null }
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-3.5 border border-white/5 group hover:border-[#00ff9c]/20 transition-all">
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-2">
                      {item.icon && <item.icon className="h-3 w-3" />}
                      <span className="text-[10px] font-bold uppercase tracking-widest font-mono">{item.label}</span>
                    </div>
                    <div className="text-[14px] font-bold text-white font-mono">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Audio Player (Mock UI) */}
              <div>
                <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-3">SECURE_RECORDING_STREAM</h3>
                <div className="flex items-center gap-3 bg-black border border-[#00ff9c]/20 rounded-xl py-3 px-4 shadow-[0_0_20px_rgba(0,255,156,0.05)]">
                  <button className="p-1 px-2 text-[#00ff9c] hover:scale-110 transition-transform">
                    <PlayCircle className="h-6 w-6" />
                  </button>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-[#00ff9c] to-[#00b36b] rounded-full shadow-[0_0_10px_#00ff9c]" />
                  </div>
                  <span className="text-[10px] text-[#00ff9c] font-mono font-bold tracking-tighter">00:45 / {call?.duration}</span>
                </div>
              </div>

               <div className="h-px bg-white/5" />

                <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-6 sticky top-0 py-2 z-10 bg-[#050505]/95">TRANSCRIPT_DECRYPTED</h3>
                <div className="space-y-6 pb-12">
                  {call?.transcript && call.transcript.length > 0 ? (
                    call.transcript.map((msg, i) => {
                      const isUser = msg.role === "user";
                      return (
                        <div key={i} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                          <div className="flex items-center gap-2 mb-2 px-1">
                            <span className={`text-[9px] font-bold uppercase tracking-[0.2em] font-mono ${isUser ? "text-zinc-500" : "text-[#00ff9c]"}`}>
                              {isUser ? "SOURCE_USER" : `AGENT_${call?.agentName.toUpperCase()}`}
                            </span>
                            <span className="text-[9px] text-zinc-700 font-mono">{msg.time}</span>
                          </div>
                          <div
                            className={`max-w-[90%] px-4 py-3 rounded-lg text-[13px] leading-relaxed font-mono tracking-tight ${
                              isUser 
                                ? "bg-white/[0.03] text-zinc-300 border border-white/5 rounded-tr-none" 
                                : "bg-[#00ff9c]/[0.02] text-white border border-[#00ff9c]/10 rounded-tl-none shadow-[0_0_15px_rgba(0,255,156,0.03)]"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
                      <AlertCircle className="h-6 w-6 text-zinc-800 mb-4" />
                      <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-widest">NO_TRANSCRIPT_AVAILABLE</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
