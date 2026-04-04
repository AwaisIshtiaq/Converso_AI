import { notFound } from 'next/navigation'
import Link from 'next/link'
import { subjectsColors } from '@/constants'
import { getCompanionById } from '@/lib/actions/companion.actions'
import ActionButtons from './ActionButtons'

// Subject icon mapping
const subjectIcons: Record<string, string> = {
  science: '🔬',
  maths: '📐',
  language: '📚',
  coding: '💻',
  history: '🏛️',
  economics: '📊',
}

function getSubjectColor(subject: string): string {
  return (subjectsColors as Record<string, string>)[subject.toLowerCase()] || '#E5D0FF'
}

function getSubjectIcon(subject: string): string {
  return subjectIcons[subject.toLowerCase()] || '📚'
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CompanionSessionPage({ params }: PageProps) {
  const { id } = await params

  console.log('CompanionSessionPage: Fetching id:', id)

  let companion = null
  let error = null

  try {
    companion = await getCompanionById(id)
  } catch (e: any) {
    error = e.message
    console.error('Error fetching companion:', e)
  }

  if (!companion) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/companions" className="text-blue-600 hover:underline mb-6 inline-block">
            ← Back to Library
          </Link>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Companion Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error || `No companion found with ID: ${id}`}
            </p>
            <Link 
              href="/companions" 
              className="inline-block px-6 py-3 bg-[#fe5933] text-white rounded-lg hover:bg-[#e54d2b] transition-colors"
            >
              Browse All Companions
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const subjectColor = getSubjectColor(companion.subject)
  const subjectIcon = getSubjectIcon(companion.subject)

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/companions" className="hover:text-gray-900">Companions</Link>
          <span>/</span>
          <span className="text-gray-900">{companion.name}</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Subject Icon */}
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: subjectColor }}
            >
              {subjectIcon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-xl font-semibold text-gray-900 truncate">
                  {companion.name}
                </h1>
                <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full shrink-0">
                  {capitalize(companion.subject)}
                </span>
              </div>
              <p className="text-gray-600 truncate">
                Topic: {companion.topic}
              </p>
            </div>

            {/* Duration */}
            <div className="text-lg font-medium text-gray-900 shrink-0">
              {companion.duration} mins
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Voice Settings</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Voice</span>
                <span className="font-medium">{companion.voice || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Style</span>
                <span className="font-medium">{companion.style || 'Not set'}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <ActionButtons companionId={id} />
          </div>
        </div>

        {/* Debug info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-500 font-mono">
          Debug ID: {id}
        </div>
      </div>
    </main>
  )
}
