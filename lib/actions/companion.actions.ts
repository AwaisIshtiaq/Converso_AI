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

export const CreateCompanion = async (formData: CreateCompanionInput) => {
  try {
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
      console.error("Supabase error:", error)
      throw new Error(error.message || "Failed to create a companion")
    }

    if (!data || data.length === 0) {
      throw new Error("Failed to create companion - no data returned")
    }

    return data[0]
  } catch (error) {
    console.error("CreateCompanion error:", error)
    throw error
  }
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
  const supabase = createSupabaseClient()

  let query = supabase
    .from('companions')
    .select('*')

  if (subject) {
    query = query.eq('subject', subject)
  }

  if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }

  query = query.range((page - 1) * limit, page * limit - 1)

  const { data: companions, error } = await query

  if (error) {
    console.error("Supabase error:", error)
    throw new Error(error.message)
  }

  return companions || []
}
