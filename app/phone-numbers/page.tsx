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
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors shadow-lg active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add Number
          </button>
        }
      />

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-card-border)]">
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">Number</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">Nickname</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">Assigned Agent</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-right">Created</th>
                <th className="px-6 py-3.5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {pns.map((pn) => (
                <tr
                  key={pn.id}
                  className="border-b border-[var(--color-card-border)] last:border-0 hover:bg-zinc-50/60 transition-colors duration-150 group"
                >
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-semibold text-zinc-900 tabular-nums">{pn.number}</p>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-zinc-600 font-medium">{pn.nickname}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-zinc-100 flex items-center justify-center">
                        <Bot className="h-3.5 w-3.5 text-zinc-500" />
                      </div>
                      <span className="text-[13px] text-zinc-700 font-medium">
                        {pn.agentName} {pn.agentRole !== "No agent assigned" && `– ${pn.agentRole}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusPill variant={pn.status} />
                  </td>
                  <td className="px-6 py-4 text-[13px] text-zinc-400 text-right whitespace-nowrap">
                    {pn.createdAt}
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => handleDeleteNumber(pn.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
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
