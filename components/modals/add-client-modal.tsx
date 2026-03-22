"use client";

import { useState } from "react";
import { X, Loader2, Plus, Globe, Building2, Activity } from "lucide-react";
import { db } from "@/lib/insforge";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddClientModal({ isOpen, onClose, onSuccess }: AddClientModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    status: "active",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Add default stats for mock consistency during migration
    const newClient = {
      ...formData,
      agent_count: 0,
      calls_last_30d: 0,
      booking_rate: 0,
      success_rate: 0,
    };

    const { error } = await db.clients.create(newClient);
    
    if (error) {
      alert("Error creating client: " + error.message);
    } else {
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in"
        style={{ boxShadow: '0 0 50px rgba(0,255,156,0.1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
          <div>
            <h2 className="text-xl font-black text-[#00ff9c] tracking-tight flex items-center gap-2">
              <Plus className="h-5 w-5" strokeWidth={3} />
              NEW CLIENT ENTITY
            </h2>
            <p className="text-[11px] text-zinc-500 font-mono mt-1 uppercase tracking-widest">Registering new workspace on InsForge</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono ml-1">
                Client Name
              </label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 transition-colors group-focus-within:text-[#00ff9c]" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex Global Corp"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[14px] text-white focus:outline-none focus:border-[#00ff9c]/50 focus:bg-[#00ff9c]/5 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono ml-1">
                Industry Sector
              </label>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 transition-colors group-focus-within:text-[#00ff9c]" />
                <input
                  type="text"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. Enterprise Logistics"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[14px] text-white focus:outline-none focus:border-[#00ff9c]/50 focus:bg-[#00ff9c]/5 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono ml-1">
                Initial Deployment Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['active', 'inactive', 'onboarding'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`py-3 rounded-2xl text-[12px] font-bold capitalize transition-all border ${
                      formData.status === status 
                        ? 'bg-[#00ff9c] text-black border-[#00ff9c] shadow-[0_0_20px_rgba(0,255,156,0.2)]' 
                        : 'bg-white/5 text-zinc-400 border-white/5 hover:border-white/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-[13px] font-bold text-zinc-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-[#00ff9c] hover:bg-[#00e68c] text-black py-4 rounded-2xl text-[13px] font-black tracking-widest shadow-[0_0_30px_rgba(0,255,156,0.2)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  SYNCING...
                </>
              ) : (
                "ACTIVATE CLIENT"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
