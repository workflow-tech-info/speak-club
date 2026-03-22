import { createClient } from '@insforge/sdk';

const baseUrl = 'https://99w3488i.us-east.insforge.app';
const anonKey = 'ik_f8af05f06297081f765cf918396eec0d';

export const insforge = createClient({
  baseUrl,
  anonKey,
});

// ─── Database Services ──────────────────────────────────────

export const db = {
  clients: {
    async getAll() {
      const { data, error } = await insforge.database
        .from('clients')
        .select('*')
        .order('name', { ascending: true });
      return { data, error };
    },
    async getById(id: string) {
      const { data, error } = await insforge.database
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },
    async create(client: any) {
      const { data, error } = await insforge.database
        .from('clients')
        .insert([client])
        .select()
        .single();
      return { data, error };
    },
    async update(id: string, updates: any) {
      const { data, error } = await insforge.database
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },
    async delete(id: string) {
      const { error } = await insforge.database
        .from('clients')
        .delete()
        .eq('id', id);
      return { error };
    }
  },
  agents: {
    async getAll() {
      const { data, error } = await insforge.database
        .from('agents')
        .select('*, client:clients(name)')
        .order('name', { ascending: true });
      return { data, error };
    },
    async getById(id: string) {
      const { data, error } = await insforge.database
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },
    async getByClient(clientId: string) {
      const { data, error } = await insforge.database
        .from('agents')
        .select('*')
        .eq('client_id', clientId);
      return { data, error };
    },
    async create(agent: any) {
      const { data, error } = await insforge.database
        .from('agents')
        .insert([agent])
        .select()
        .single();
      return { data, error };
    },
    async update(id: string, updates: any) {
      const { data, error } = await insforge.database
        .from('agents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },
    async delete(id: string) {
      const { error } = await insforge.database
        .from('agents')
        .delete()
        .eq('id', id);
      return { error };
    }
  },
  callLogs: {
    async getAll(limit = 20) {
      const { data, error } = await insforge.database
        .from('call_logs')
        .select('*, agent:agents(name), client:clients(name)')
        .order('start_time', { ascending: false })
        .limit(limit);
      return { data, error };
    },
    async create(log: any) {
      const { data, error } = await insforge.database
        .from('call_logs')
        .insert([log])
        .select()
        .single();
      return { data, error };
    }
  },
  phoneNumbers: {
    async getAll() {
      const { data, error } = await insforge.database
        .from('phone_numbers')
        .select('*, agent:agents(name, role)')
        .order('number', { ascending: true });
      return { data, error };
    },
    async create(pn: any) {
      const { data, error } = await insforge.database
        .from('phone_numbers')
        .insert([pn])
        .select()
        .single();
      return { data, error };
    },
    async delete(id: string) {
      const { error } = await insforge.database
        .from('phone_numbers')
        .delete()
        .eq('id', id);
      return { error };
    }
  },
  qaReviews: {
    async getAll() {
      const { data, error } = await insforge.database
        .from('qa_reviews')
        .select('*, call:call_logs(agent:agents(name), client:clients(name), duration, sentiment)')
        .order('created_at', { ascending: false });
      return { data, error };
    }
  },
  analytics: {
    async getOverallStats() {
      const { data, error } = await insforge.database
        .from('analytics_stats')
        .select('*')
        .single();
      return { data, error };
    },
    async getDailyStats() {
      const { data, error } = await insforge.database
        .from('analytics_daily')
        .select('*')
        .order('date', { ascending: true });
      return { data, error };
    },
    async getSentimentDistribution() {
      const { data, error } = await insforge.database
        .from('analytics_sentiment')
        .select('*');
      return { data, error };
    }
  }
};
