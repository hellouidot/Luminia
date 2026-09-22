// Supabase Database & Auth Client Setup

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const databaseService = {
  // Save captured lead directly to Supabase table or LocalStorage fallback
  async saveLead(leadData) {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .insert([leadData]);
        if (error) console.error("Supabase lead error:", error);
        return data;
      } catch (err) {
        console.error("Database connection error:", err);
      }
    }
    
    // Fallback local storage
    const leads = JSON.parse(localStorage.getItem('lumina_leads') || '[]');
    leads.push({ ...leadData, date: new Date().toISOString() });
    localStorage.setItem('lumina_leads', JSON.stringify(leads));
  },

  // Deduct credit via atomic Supabase database function
  async deductCreditDb(userId) {
    if (supabase && userId) {
      const { data, error } = await supabase
        .rpc('deduct_user_credit', { target_user_id: userId });
      if (!error) return data;
    }
    return true; // Local state fallback
  }
};
