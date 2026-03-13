"use client";

import { useState } from "react";
import { X, Info, CheckCircle2 } from "lucide-react";
import { GlassCard } from "./ui/page-header";

interface AddPhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (phoneNumber: { number: string; nickname: string; sipIdentifier: string }) => void;
}

export function AddPhoneNumberModal({ isOpen, onClose, onAdd }: AddPhoneNumberModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    sipIdentifier: "",
    label: "",
    username: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setStep("success");
    setTimeout(() => {
      onAdd({
        number: `+1 (555) 100-${Math.floor(1000 + Math.random() * 9000)}`,
        nickname: formData.label || "New SIP Line",
        sipIdentifier: formData.sipIdentifier,
      });
      // Don't close immediately to show success
    }, 1500);
  };

  const resetAndClose = () => {
    setStep("form");
    setFormData({ sipIdentifier: "", label: "", username: "", password: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <GlassCard className="w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,156,0.1)] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[#00ff9c]/10 bg-white/[0.02]">
          <h2 className="text-[15px] font-bold text-[#00ff9c] tracking-widest font-mono uppercase">IMPORT_SIP_URI</h2>
          <button 
            onClick={resetAndClose}
            className="p-2 text-zinc-500 hover:text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-xl transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">SIP_IDENTIFIER</label>
              <input
                required
                value={formData.sipIdentifier}
                onChange={(e) => setFormData({ ...formData, sipIdentifier: e.target.value })}
                className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/20 rounded-xl focus:border-[#00ff9c] text-white outline-none transition-all font-mono placeholder:text-zinc-800"
                placeholder="id_alpha_omega"
              />
              <p className="text-[10px] text-zinc-600 font-mono">ORIGIN: <span className="text-[#00ff9c]">sip:{formData.sipIdentifier || '...'}@sip.vapi.ai</span></p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">SYSTEM_LABEL</label>
              <input
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/20 rounded-xl focus:border-[#00ff9c] text-white outline-none transition-all font-mono placeholder:text-zinc-800"
                placeholder="ENTRY_NODE_X"
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-mono">SIP_AUTH_METRICS (OPTIONAL)</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">USERNAME</label>
                  <input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl focus:border-[#00ff9c] text-white outline-none transition-all font-mono placeholder:text-zinc-900"
                    placeholder="UID"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">PASSWORD</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl focus:border-[#00ff9c] text-white outline-none transition-all font-mono placeholder:text-zinc-900"
                    placeholder="PASS"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button type="button" className="text-[#00ff9c] text-[10px] font-bold hover:underline flex items-center gap-1 uppercase tracking-widest font-mono opacity-60 hover:opacity-100 transition-opacity">
                <Info className="h-3 w-3" />
                READ_PROTOCOLS_DOCUMENTATION
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-6 py-3 text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest font-mono transition-colors"
              >
                ABORT
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl shadow-[0_0_20px_rgba(0,255,156,0.2)] transition-all uppercase tracking-widest font-mono"
              >
                INITIALIZE_SIP_LINK
              </button>
            </div>
          </form>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-500">
            <div className="h-20 w-20 bg-[#00ff9c]/5 border border-[#00ff9c]/20 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(0,255,156,0.1)]">
              <CheckCircle2 className="h-10 w-10 text-[#00ff9c]" />
            </div>
            <h3 className="text-xl font-bold text-white font-mono uppercase tracking-[0.2em]">SUCCESS!</h3>
            <p className="text-zinc-500 text-[11px] font-mono uppercase tracking-widest leading-relaxed max-w-[280px]">
              SIP_NODE_ESTABLISHED.<br/>INTEGRATION_COMPLETE.
            </p>
            <button
              onClick={resetAndClose}
              className="mt-6 px-10 py-3 bg-[#00ff9c] text-black font-bold rounded-xl hover:bg-[#00e68d] transition-all uppercase tracking-[0.2em] font-mono shadow-[0_0_20px_rgba(0,255,156,0.2)]"
            >
              DONE
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
