import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Cache the client to avoid recreating on every request
let cachedClient: SupabaseClient | null = null

// Public client for server components (read operations)
export function createSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('[Supabase] Missing environment variables:')
    console.error('  NEXT_PUBLIC_SUPABASE_URL:', url ? '✓ Set' : '✗ Missing')
    console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY:', key ? '✓ Set' : '✗ Missing')
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    )
  }

  // Return cached client if available
  if (cachedClient) {
    return cachedClient
  }

  // Create new client
  console.log('[Supabase] Creating new client')
  cachedClient = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  })

  return cachedClient
}

// Authenticated client for server actions (write operations)
export async function createAuthenticatedSupabaseClient(authToken?: string): Promise<SupabaseClient> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('[Supabase] Missing environment variables in authenticated client')
    throw new Error('Missing Supabase environment variables')
  }

  const headers: Record<string, string> = {}
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers,
    },
  })
}

// Clear cache (useful for testing)
export function clearSupabaseCache() {
  cachedClient = null
}
