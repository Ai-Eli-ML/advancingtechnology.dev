'use server'

import { createSupabaseServer } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Plugin schema for validation
const pluginSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be in format X.Y.Z'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
})

export async function getMyPlugins() {
  const supabase = await createSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // Mock data - in production, query from database
    const plugins = [
      {
        id: 1,
        name: "AI Chat Plugin",
        description: "Advanced conversational AI with natural language processing",
        status: "active" as const,
        downloads: 1234,
        revenue: "$2,468.00",
        rating: 4.8,
        lastUpdated: "2 days ago",
        version: "2.1.0",
        price: 49.99,
        category: "AI"
      },
      {
        id: 2,
        name: "Voice Assistant",
        description: "Voice-enabled AI assistant for hands-free interaction",
        status: "active" as const,
        downloads: 892,
        revenue: "$1,784.00",
        rating: 4.9,
        lastUpdated: "1 week ago",
        version: "1.8.2",
        price: 89.99,
        category: "AI"
      },
      {
        id: 3,
        name: "Code Generator",
        description: "AI-powered code generation and completion tool",
        status: "pending" as const,
        downloads: 567,
        revenue: "$851.00",
        rating: 4.6,
        lastUpdated: "3 days ago",
        version: "3.0.0",
        price: 29.99,
        category: "Development"
      },
      {
        id: 4,
        name: "Data Analyzer",
        description: "Machine learning-based data analysis and visualization",
        status: "draft" as const,
        downloads: 0,
        revenue: "$0.00",
        rating: 0,
        lastUpdated: "5 hours ago",
        version: "0.9.0",
        price: 39.99,
        category: "Analytics"
      }
    ]

    return { success: true, data: plugins }
  } catch (error) {
    console.error('Error fetching plugins:', error)
    return { success: false, error: 'Failed to fetch plugins' }
  }
}

export async function createPlugin(formData: {
  name: string
  description: string
  version: string
  price: number
  category: string
}) {
  const supabase = await createSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const validatedData = pluginSchema.parse(formData)

    // In production, insert into database
    console.log('Creating plugin:', { userId: user.id, ...validatedData })

    revalidatePath('/dashboard/plugins')
    return { success: true, message: 'Plugin created successfully' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    console.error('Error creating plugin:', error)
    return { success: false, error: 'Failed to create plugin' }
  }
}

export async function updatePlugin(pluginId: number, formData: {
  name?: string
  description?: string
  version?: string
  price?: number
  category?: string
}) {
  const supabase = await createSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // Partial validation
    const partialSchema = pluginSchema.partial()
    const validatedData = partialSchema.parse(formData)

    // In production, update database
    console.log('Updating plugin:', { pluginId, userId: user.id, ...validatedData })

    revalidatePath('/dashboard/plugins')
    return { success: true, message: 'Plugin updated successfully' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    console.error('Error updating plugin:', error)
    return { success: false, error: 'Failed to update plugin' }
  }
}

export async function deletePlugin(pluginId: number) {
  const supabase = await createSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // In production, delete from database
    console.log('Deleting plugin:', { pluginId, userId: user.id })

    revalidatePath('/dashboard/plugins')
    return { success: true, message: 'Plugin deleted successfully' }
  } catch (error) {
    console.error('Error deleting plugin:', error)
    return { success: false, error: 'Failed to delete plugin' }
  }
}

export async function togglePluginStatus(pluginId: number, newStatus: 'active' | 'draft') {
  const supabase = await createSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // In production, update database
    console.log('Toggling plugin status:', { pluginId, userId: user.id, newStatus })

    revalidatePath('/dashboard/plugins')
    return { success: true, message: `Plugin ${newStatus === 'active' ? 'published' : 'unpublished'} successfully` }
  } catch (error) {
    console.error('Error toggling plugin status:', error)
    return { success: false, error: 'Failed to toggle plugin status' }
  }
}
