import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, BarChart3, Clock, AlertCircle } from "lucide-react";
import { StatusPill } from "./status-pill";
import type { CallLog } from "@/lib/mock-data";

interface CallDrawerProps {
  call: CallLog | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock transcript since original data only had simple fields
const mockTranscript = [
  { role: "agent", content: "Hello, this is Sophia calling from Meridian Health. Am I speaking with John?", time: "0:02" },
  { role: "user", content: "Yes, this is John.", time: "0:08" },
  { role: "agent", content: "Great! I'm calling to follow up on your recent request to schedule a consultation. Do you have a few minutes?", time: "0:12" },
  { role: "user", content: "Sure, I have a moment now.", time: "0:20" },
  { role: "agent", content: "Perfect. I see you were interested in our comprehensive health package. Would mornings or afternoons work better for your initial visit?", time: "0:25" },
  { role: "user", content: "Afternoons are usually better for me. Maybe around 2 PM?", time: "0:38" },
  { role: "agent", content: "Let me check our schedule for 2 PM. It looks like we have an opening next Tuesday at 2:30 PM. Would that work?", time: "0:45" },
  { role: "user", content: "Yes, next Tuesday at 2:30 sounds great.", time: "0:52" },
  { role: "agent", content: "Wonderful, I've got you booked. You'll receive a confirmation email shortly. Is there anything else I can help with today?", time: "1:01" },
  { role: "user", content: "No, that's it. Thanks!", time: "1:08" },
  { role: "agent", content: "You're welcome, John. Have a great day!", time: "1:12" }
];

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
          className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white h-full shadow-2xl border-l border-[var(--color-card-border)] flex flex-col z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-card-border)] bg-zinc-50/50">
            <div>
              <h2 className="text-[17px] font-bold text-zinc-900">Call Details</h2>
              <p className="text-[12px] text-zinc-500 mt-0.5">{call?.id || "Unknown Call"}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-zinc-400 hover:bg-zinc-200/50 hover:text-zinc-600 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                  <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Duration</span>
                  </div>
                  <p className="text-[15px] font-semibold text-zinc-900">{call?.duration}</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                  <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Status</span>
                  </div>
                  <div className="mt-0.5">
                    {call && <StatusPill variant={call.status} />}
                  </div>
                </div>
                <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                  <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Sentiment</span>
                  </div>
                  <div className="mt-0.5">
                    {call && <StatusPill variant={call.sentiment} />}
                  </div>
                </div>
                <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                  <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Agent</span>
                  </div>
                  <p className="text-[13px] font-semibold text-zinc-900">{call?.agentName}</p>
                </div>
              </div>

              {/* Audio Player (Mock UI) */}
              <div>
                <h3 className="text-[13px] font-bold text-zinc-900 mb-2">Recording</h3>
                <div className="flex items-center gap-3 bg-zinc-900 rounded-full py-2 px-3 text-white">
                  <button className="p-1 hover:bg-zinc-800 rounded-full transition-colors">
                    <PlayCircle className="h-5 w-5" />
                  </button>
                  <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-blue-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono pr-2">0:45 / {call?.duration}</span>
                </div>
              </div>

              <hr className="border-t border-zinc-100" />

              {/* Transcript */}
              <div>
                <h3 className="text-[13px] font-bold text-zinc-900 mb-4 bg-white/90 sticky top-0 py-2 z-10">Transcript</h3>
                <div className="space-y-4 pb-12">
                  {mockTranscript.map((msg, i) => {
                    const isUser = msg.role === "user";
                    return (
                      <div key={i} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                            {isUser ? "User" : call?.agentName}
                          </span>
                          <span className="text-[10px] text-zinc-300 font-mono">{msg.time}</span>
                        </div>
                        <div
                          className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                            isUser 
                              ? "bg-blue-500 text-white rounded-tr-sm" 
                              : "bg-zinc-100 text-zinc-800 rounded-tl-sm border border-zinc-200/60"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
