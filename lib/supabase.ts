import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

export async function createSupabaseClient() {
  const authObj = await auth()
  const userId = authObj.userId
  
  // Get Clerk's Supabase JWT - may be null if template not configured
  let token: string | null = null
  try {
    token = await authObj.getToken({ template: 'supabase' })
  } catch (e) {
    console.error('Failed to get Supabase token:', e)
  }

  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers,
      },
    }
  )

  return supabase
}
