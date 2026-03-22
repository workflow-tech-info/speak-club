"use client";

import React, { useEffect, useState } from "react";
import { Activity, Phone, Terminal, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceMonitor() {
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
    <div className="min-h-screen bg-[#050505] text-green-400 font-mono p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex items-center justify-between pb-4 border-b border-green-900/50">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 animate-pulse text-green-500" />
            <h1 className="text-2xl font-bold tracking-widest text-green-500 uppercase">Voice Matrix<span className="text-white text-opacity-50 text-xs ml-2">v.1.0</span></h1>
          </div>
          <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-950/30 px-3 py-1.5 rounded-full border border-green-900/50">
            <Wifi className="w-3 h-3 animate-pulse" />
            <span>LIVE MONITORING</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Active Calls Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2 text-sm text-green-500 uppercase tracking-widest border-b border-green-900 pb-2">
              <Phone className="w-4 h-4" />
              <h2>Active Streams</h2>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {Object.values(sessions).map((session: any) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={session.stream_id} 
                    className="p-4 bg-green-950/20 border border-green-900/50 rounded-lg hover:border-green-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-green-600 truncate max-w-[150px]">{session.call_id || session.stream_id}</div>
                      <div className={`w-2 h-2 rounded-full ${session.ended_at ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
                    </div>
                    <div className="text-sm text-white mb-2">
                      <span className="text-green-700">FROM:</span> {session.from || 'Unknown'} 
                      <span className="text-green-700 ml-2">TO:</span> {session.to || 'Unknown'}
                    </div>
                    <div className="flex justify-between text-xs text-green-400">
                      <span>Pkts: {session.packets_received}</span>
                      <span>{new Date(session.started_at).toLocaleTimeString()}</span>
                    </div>
                  </motion.div>
                ))}
                {Object.keys(sessions).length === 0 && (
                  <div className="text-center p-8 text-green-800 text-sm border border-dashed border-green-900/50 rounded-lg">
                    NO ACTIVE STREAMS
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Logs Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-sm text-green-500 uppercase tracking-widest border-b border-green-900 pb-2">
              <Terminal className="w-4 h-4" />
              <h2>System Logs</h2>
            </div>
            
            <div className="bg-black/50 border border-green-900/50 rounded-lg h-[600px] flex flex-col relative overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                {logs.slice().reverse().map((log, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedLog(log)}
                    className="flex space-x-3 cursor-pointer hover:bg-green-900/20 p-1.5 rounded transition-colors group"
                  >
                    <span className="text-green-800 w-20 shrink-0">{new Date(log.timestamp).toLocaleTimeString([], { hour12: false, fractionalSecondDigits: 3 })}</span>
                    <span className={`w-24 shrink-0 uppercase tracking-wider font-bold ${
                      log.type === 'start' ? 'text-blue-400' : 
                      log.type === 'stop' ? 'text-red-400' : 
                      log.type === 'server_response' ? 'text-yellow-400' : 
                      'text-green-600'
                    }`}>
                      [{log.type}]
                    </span>
                    <span className="text-green-400/80 truncate flex-1 group-hover:text-green-300">
                      {log.stream_id || log.id || log.action || log.event || 'System Event'}
                    </span>
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="text-green-800 text-center mt-10">AWAITING SYSTEM EVENTS...</div>
                )}
              </div>
              
              {/* Overlay JSON Inspector */}
              <AnimatePresence>
                {selectedLog && (
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0a0f0a] border-t border-green-500/30 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs font-bold text-green-400 uppercase tracking-widest">JSON Inspector</h3>
                      <button 
                        onClick={() => setSelectedLog(null)}
                        className="text-green-600 hover:text-green-400 text-xs px-2 py-1 rounded bg-green-900/20 border border-transparent hover:border-green-500/30"
                      >
                        CLOSE
                      </button>
                    </div>
                    <pre className="text-[11px] text-green-300 overflow-auto h-[calc(100%-2rem)] p-2 bg-black/50 rounded border border-green-900/30">
                      {JSON.stringify(selectedLog, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
