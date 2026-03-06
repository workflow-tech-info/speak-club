"use client";

import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { Save, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <>
      <PageHeader
        title="General Settings"
        subtitle="Manage your organization settings"
      />

      <div className="max-w-2xl space-y-6">
        {/* Organization */}
        <GlassCard>
          <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
            <h2 className="text-[15px] font-bold text-zinc-900">Organization</h2>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Organization Name</label>
              <input
                type="text"
                defaultValue="Speak Club"
                className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Slug</label>
              <input
                type="text"
                defaultValue="demo-agency"
                className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </GlassCard>

        {/* Retell AI Integration */}
        <GlassCard delay={100}>
          <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
            <h2 className="text-[15px] font-bold text-zinc-900">Retell AI Integration</h2>
            <p className="text-[12px] text-zinc-400 mt-0.5">Connect your Retell AI account to create and manage voice agents. Your API key is encrypted and stored securely.</p>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Retell API Key</label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  defaultValue="key_d4a3996581faf40ccd2a965ca54c"
                  className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono pr-12"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
              <Save className="h-4 w-4" />
              Save API Key
            </button>
          </div>
        </GlassCard>

        {/* n8n Integration */}
        <GlassCard delay={200}>
          <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
            <h2 className="text-[15px] font-bold text-zinc-900">n8n Automation</h2>
            <p className="text-[12px] text-zinc-400 mt-0.5">Configure your n8n instance for CRM sync and booking automations.</p>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">n8n Base URL</label>
              <input
                type="url"
                defaultValue="https://app.workflow-tech.info/"
                className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">n8n API Key</label>
              <div className="relative">
                <input
                  type="password"
                  defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono pr-12"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Booking Webhook URL</label>
              <input
                type="url"
                defaultValue="https://app.workflow-tech.info/webhook/booking"
                className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Availability Webhook URL</label>
              <input
                type="url"
                defaultValue="https://app.workflow-tech.info/webhook-test/availability"
                className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
              <Save className="h-4 w-4" />
              Save Configuration
            </button>
          </div>
        </GlassCard>

        {/* Danger Zone */}
        <GlassCard delay={300}>
          <div className="px-6 py-5 border-b border-red-100">
            <h2 className="text-[15px] font-bold text-red-600">Danger Zone</h2>
          </div>
          <div className="px-6 py-6 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-zinc-900">Delete Organization</p>
              <p className="text-[12px] text-zinc-400 mt-0.5">Permanently delete this organization and all associated data.</p>
            </div>
            <button className="px-4 py-2 text-[13px] font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-xl transition-colors">
              Delete
            </button>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
