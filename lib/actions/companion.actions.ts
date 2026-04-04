"use server"

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient, createAuthenticatedSupabaseClient } from "@/lib/supabase"

type CreateCompanionInput = {
  name: string
  subject: string
  topic: string
  voice: string
  style: string
  duration: number
}

type GetAllCompanions = {
  limit?: number
  page?: number
  subject?: string
  topic?: string
}

// Helper to check Supabase env vars
function checkEnvVars() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    console.error('Missing Supabase environment variables!')
    console.error('NEXT_PUBLIC_SUPABASE_URL:', url ? 'Set' : 'Missing')
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', key ? 'Set' : 'Missing')
    return false
  }
  return true
}

export const CreateCompanion = async (formData: CreateCompanionInput) => {
  console.log('CreateCompanion called with:', formData)
  
  try {
    if (!checkEnvVars()) {
      throw new Error('Supabase not configured properly')
    }

    const authObj = await auth()
    const userId = authObj.userId

    if (!userId) {
      throw new Error("Unauthorized - Please sign in to create a companion")
    }

    const supabase = await createAuthenticatedSupabaseClient()

    const { data, error } = await supabase
      .from("companions")
      .insert({
        name: formData.name,
        subject: formData.subject,
        topic: formData.topic,
        duration: formData.duration,
        voice: formData.voice,
        style: formData.style,
        author: userId,
      })
      .select()

    if (error) {
      console.error("Supabase insert error:", error)
      throw new Error(error.message || "Failed to create a companion")
    }

    if (!data || data.length === 0) {
      throw new Error("Failed to create companion - no data returned")
    }

    console.log('CreateCompanion success:', data[0])
    return data[0]
  } catch (error: any) {
    console.error("CreateCompanion error:", error)
    throw error
  }
}

export const getAllCompanions = async ({ 
  limit = 12, 
  page = 1, 
  subject, 
  topic 
}: GetAllCompanions) => {
  console.log('getAllCompanions called:', { limit, page, subject, topic })
  
  try {
    if (!checkEnvVars()) {
      console.warn('Supabase not configured, returning empty array')
      return []
    }

    const supabase = createSupabaseClient()

    let query = supabase
      .from('companions')
      .select('*')

    // Apply subject filter
    if (subject && subject.trim() !== '') {
      console.log('Filtering by subject:', subject)
      query = query.eq('subject', subject.toLowerCase())
    }

    // Apply topic/name search filter
    if (topic && topic.trim() !== '') {
      console.log('Filtering by topic/name:', topic)
      query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    // Order by creation date
    query = query.order('created_at', { ascending: false })

    const { data: companions, error } = await query

    if (error) {
      console.error("Supabase query error:", error)
      throw new Error(error.message)
    }

    console.log('getAllCompanions success:', companions?.length || 0, 'companions found')
    return companions || []
  } catch (error: any) {
    console.error("getAllCompanions error:", error)
    throw new Error(`Failed to fetch companions: ${error.message}`)
  }
}

export const getCompanionById = async (id: string) => {
  console.log('getCompanionById called with id:', id)
  
  if (!id) {
    console.error('getCompanionById: No ID provided')
    return null
  }

  try {
    if (!checkEnvVars()) {
      console.warn('Supabase not configured')
      return null
    }

    const supabase = createSupabaseClient()

    const { data, error } = await supabase
      .from('companions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('getCompanionById: Companion not found for id:', id)
        return null // Not found - not an error
      }
      console.error("Supabase fetch error:", error)
      throw new Error(error.message)
    }

    console.log('getCompanionById success:', data?.name)
    return data
  } catch (error: any) {
    console.error("getCompanionById error:", error)
    throw new Error(`Failed to fetch companion: ${error.message}`)
  }
}
