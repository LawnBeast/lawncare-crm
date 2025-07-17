import { createClient } from '@supabase/supabase-js';

// Use demo/fallback values to prevent API key errors
const supabaseUrl = 'https://demo.supabase.co';
const supabaseAnonKey = 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection function - always returns false for demo mode
export const testConnection = async () => {
  console.warn('Running in demo mode - database connection disabled');
  return false;
};

// Initialize database with error handling
export const initializeDatabase = async () => {
  console.warn('Database initialization skipped - running in demo mode');
  console.log('All data will be stored locally and reset on page refresh');
};