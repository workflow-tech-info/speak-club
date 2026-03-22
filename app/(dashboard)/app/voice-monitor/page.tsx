"use client";

import React, { useEffect, useState } from "react";
import { Activity, Phone, Terminal, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader, GlassCard } from "@/components/ui/page-header";

export default function VoiceMonitorPage() {
  const [sessions, setSessions] = useState<Record<string, any>>({});
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  
  const fetchState = async () => {
    try {
      // Try local port 8080 first, then fallback to production domain
      const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://localhost:8080' 
        : 'https://api.voice.workflow-tech.info';

      const callRes = await fetch(`${baseUrl}/calls`).catch(() => null);
      if (callRes && callRes.ok) setSessions(await callRes.json());
      
      const logRes = await fetch(`${baseUrl}/logs`).catch(() => null);
      if (logRes && logRes.ok) setLogs(await logRes.json());
    } catch (e) {
      console.error("Failed to fetch state", e);
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageHeader 
        title="Voice Matrix Monitor" 
        subtitle="Real-time inbound call streaming and WebSocket event tracking"
        actions={
          <div className="flex items-center space-x-2 text-xs text-green-500 bg-[#00ff9c]/10 px-3 py-1.5 rounded-xl border border-[#00ff9c]/20">
            <Wifi className="w-3 h-3 animate-pulse" />
            <span className="font-bold tracking-widest">LIVE_FEED</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Calls Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#00ff9c] uppercase tracking-[0.2em] mb-2">
            <Phone className="w-4 h-4" />
            <h2 className="font-mono">Active Streams</h2>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {Object.values(sessions).map((session: any) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={session.stream_id} 
                  className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#00ff9c]/30 transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] text-zinc-500 font-mono truncate max-w-[150px] uppercase">ID: {session.call_id || session.stream_id}</div>
                    <div className={`w-1.5 h-1.5 rounded-full ${session.ended_at ? 'bg-red-500' : 'bg-[#00ff9c] animate-pulse shadow-[0_0_8px_#00ff9c]'}`} />
                  </div>
                  <div className="text-[13px] text-white font-medium mb-3">
                    <span className="text-zinc-600 font-mono mr-1">FROM:</span> {session.from || 'Unknown'} 
                    <div className="h-2" />
                    <span className="text-zinc-600 font-mono mr-1">TO:</span> {session.to || 'Unknown'}
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-[#00ff9c] font-mono tracking-tighter">
                    <span>PKTS: {session.packets_received}</span>
                    <span className="text-zinc-500">{new Date(session.started_at).toLocaleTimeString([], { hour12: false })}</span>
                  </div>
                </motion.div>
              ))}
              {Object.keys(sessions).length === 0 && (
                <div className="text-center p-12 text-zinc-600 text-[11px] font-mono border border-dashed border-white/5 rounded-2xl tracking-[0.2em] uppercase">
                  No active streams detected
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Logs Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#00ff9c] uppercase tracking-[0.2em] mb-2">
            <Terminal className="w-4 h-4" />
            <h2 className="font-mono">System Events</h2>
          </div>
          
          <GlassCard className="h-[600px] flex flex-col relative overflow-hidden !p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 font-mono text-[10px]">
              {logs.slice().reverse().map((log, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedLog(log)}
                  className="flex items-center space-x-4 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all group border border-transparent hover:border-white/5"
                >
                  <span className="text-zinc-700 shrink-0 tabular-nums">{new Date(log.timestamp).toLocaleTimeString([], { hour12: false, fractionalSecondDigits: 3 })}</span>
                  <span className={`w-28 shrink-0 font-black tracking-widest ${
                    log.type === 'start' ? 'text-blue-400' : 
                    log.type === 'stop' ? 'text-red-400' : 
                    log.type === 'server_response' ? 'text-yellow-400' : 
                    'text-[#00ff9c]'
                  }`}>
                    [{log.type.toUpperCase()}]
                  </span>
                  <span className="text-zinc-400 truncate flex-1 group-hover:text-white transition-colors">
                    {log.stream_id || log.id || log.action || log.event || 'SYSTEM_SIGNAL'}
                  </span>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-zinc-700 text-center mt-20 font-mono tracking-[0.3em] uppercase">Awaiting decryption...</div>
              )}
            </div>
            
            {/* Overlay JSON Inspector */}
            <AnimatePresence>
              {selectedLog && (
                <motion.div 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  className="absolute bottom-0 left-0 right-0 h-3/4 bg-[#050505] border-t border-[#00ff9c]/20 p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.9)] z-10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-black text-[#00ff9c] uppercase tracking-[0.4em] font-mono">Payload_Inspector</h3>
                    <button 
                      onClick={() => setSelectedLog(null)}
                      className="text-[#00ff9c] hover:bg-[#00ff9c]/10 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#00ff9c]/20 transition-all uppercase tracking-widest"
                    >
                      CLOSE
                    </button>
                  </div>
                  <pre className="text-[11px] text-zinc-400 overflow-auto h-[calc(100%-3rem)] p-4 bg-black/40 rounded-xl border border-white/5 custom-scrollbar font-mono leading-relaxed">
                    {JSON.stringify(selectedLog, null, 2)}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
          
        </div>
      </div>
    </>
  );
}
