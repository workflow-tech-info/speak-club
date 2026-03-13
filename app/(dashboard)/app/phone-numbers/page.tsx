"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { phoneNumbers as initialPhoneNumbers, PhoneNumber } from "@/lib/mock-data";
import { Plus, Bot, Trash2 } from "lucide-react";
import { AddPhoneNumberModal } from "@/components/add-phone-number-modal";

export default function PhoneNumbersPage() {
  const [pns, setPns] = useState<PhoneNumber[]>(initialPhoneNumbers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNumber = (newNumber: { number: string; nickname: string; sipIdentifier: string }) => {
    const pn: PhoneNumber = {
      id: `p${Date.now()}`,
      number: newNumber.number,
      nickname: newNumber.nickname,
      agentName: "Unassigned",
      agentRole: "No agent assigned",
      status: "active",
      createdAt: "Just now",
    };
    setPns([pn, ...pns]);
  };

  const handleDeleteNumber = (id: string) => {
    if (confirm("Are you sure you want to delete this phone number?")) {
      setPns(pns.filter((pn) => pn.id !== id));
    }
  };

  return (
    <>
      <PageHeader
        title="Phone Numbers"
        subtitle="Manage your phone numbers and their agent assignments"
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)] uppercase tracking-widest font-mono"
          >
            <Plus className="h-4 w-4" />
            ADD_NUMBER
          </button>
        }
      />

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#00ff9c]/10 bg-white/[0.01]">
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#00ff9c] uppercase font-mono">NUMBER</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#00ff9c] uppercase font-mono">NICKNAME</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#00ff9c] uppercase font-mono">ASSIGNED_AGENT</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#00ff9c] uppercase font-mono text-center">STATUS</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-[#00ff9c] uppercase font-mono text-right">TIMESTAMP</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#00ff9c]/5">
              {pns.map((pn) => (
                <tr
                  key={pn.id}
                  className="hover:bg-[#00ff9c]/[0.02] transition-all duration-150 group"
                >
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-bold text-white tabular-nums font-mono">{pn.number}</p>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-zinc-500 font-mono uppercase tracking-tighter">{pn.nickname}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-[#00ff9c] opacity-50" />
                      </div>
                      <span className="text-[12px] text-zinc-300 font-mono">
                        {pn.agentName.toUpperCase()} {pn.agentRole !== "No agent assigned" && ` // ${pn.agentRole.toUpperCase()}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusPill variant={pn.status} />
                  </td>
                  <td className="px-6 py-4 text-[11px] text-zinc-600 font-mono text-right whitespace-nowrap">
                    {pn.createdAt.toUpperCase()}
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => handleDeleteNumber(pn.id)}
                      className="p-2 rounded-lg text-zinc-700 hover:text-red-500 hover:bg-red-500/5 transition-all md:opacity-0 md:group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AddPhoneNumberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddNumber}
      />
    </>
  );
}
