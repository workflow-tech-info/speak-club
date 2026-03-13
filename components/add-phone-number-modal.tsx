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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <GlassCard className="w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-lg font-bold text-zinc-900">Import SIP URI</h2>
          <button 
            onClick={resetAndClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-zinc-700">SIP Identifier</label>
              <input
                required
                value={formData.sipIdentifier}
                onChange={(e) => setFormData({ ...formData, sipIdentifier: e.target.value })}
                className="w-full px-4 py-2.5 text-[14px] bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="my-example-identifier"
              />
              <p className="text-[11px] text-zinc-400">Will be used as: <span className="text-blue-500">sip:{formData.sipIdentifier || 'identifier'}@sip.vapi.ai</span></p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-zinc-700">Label</label>
              <input
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-2.5 text-[14px] bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="Label for SIP URI"
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-zinc-800">SIP Authentication (Optional)</span>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-zinc-500">Username</label>
                <input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="SIP Authentication Username"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-zinc-500">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="SIP Authentication Password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button className="text-blue-500 text-[12px] font-medium hover:underline flex items-center gap-1">
                Read more about using SIP with Vapi in the documentation
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-6 py-2.5 text-[14px] font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-[14px] font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl shadow-lg transition-all active:scale-95"
              >
                Import SIP URI
              </button>
            </div>
          </form>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-500">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Success!</h3>
            <p className="text-zinc-500 text-sm max-w-[280px]">
              SIP URI has been imported and added to your phone numbers.
            </p>
            <button
              onClick={resetAndClose}
              className="mt-6 px-8 py-2.5 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
