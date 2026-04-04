import Link from 'next/link'
import { Suspense } from 'react'
import { subjectsColors } from '@/constants'
import CompanionCard from '@/components/CompanionCard'
import SearchFilter from '@/components/SearchFilter'
import SearchInput from '@/components/SearchInput'
import { getAllCompanions } from '@/lib/actions/companion.actions'

function getSubjectColor(subject: string): string {
  const lowerSubject = subject?.toLowerCase()
  return subjectsColors[lowerSubject as keyof typeof subjectsColors] || '#E5D0FF'
}

type SearchParams = Promise<{ subject?: string; topic?: string }>

// Loading fallback for search controls
function SearchControlsFallback() {
  return (
    <div className='flex gap-4'>
      <div className='w-[220px] h-10 bg-gray-100 border border-gray-300 rounded-lg animate-pulse' />
      <div className='w-[130px] h-10 bg-gray-100 border border-gray-300 rounded-lg animate-pulse' />
    </div>
  )
}

// Search controls wrapper
function SearchControls() {
  return (
    <div className='flex gap-4 max-sm:flex-col max-sm:w-full'>
      <SearchInput />
      <SearchFilter />
    </div>
  )
}

// Companions grid component
async function CompanionsGrid({ subject, topic }: { subject: string; topic: string }) {
  try {
    const companions = await getAllCompanions({ subject, topic })
    
    if (companions.length === 0) {
      return (
        <div className='col-span-full text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300'>
          <p className='text-lg text-gray-600 mb-2'>No companions found</p>
          <p className='text-sm text-gray-500 mb-4'>
            {subject || topic ? 'Try adjusting your filters' : 'Get started by creating your first companion'}
          </p>
          <Link 
            href='/companions/New' 
            className='inline-block px-4 py-2 bg-[#fe5933] text-white rounded-lg hover:bg-[#e54d2b] transition-colors'
          >
            Create Companion
          </Link>
        </div>
      )
    }

    return (
      <>
        <p className='text-sm text-gray-500 mb-4 w-full'>
          Showing {companions.length} companion{companions.length !== 1 ? 's' : ''}
          {subject && ` in ${subject}`}
          {topic && ` matching "${topic}"`}
        </p>
        {companions.map((companion: any) => {
          const companionId = companion.id?.toString() || String(companion.id)
          
          return (
            <CompanionCard
              key={companionId}
              id={companionId}
              name={companion.name || 'Untitled Companion'}
              topic={companion.topic || 'No topic set'}
              subject={companion.subject || 'unknown'}
              duration={companion.duration || 0}
              color={getSubjectColor(companion.subject)}
            />
          )
        })}
      </>
    )
  } catch (error: any) {
    return (
      <div className='col-span-full text-center py-16 bg-red-50 rounded-xl border border-red-200'>
        <p className='text-lg text-red-600 mb-2'>Error loading companions</p>
        <p className='text-sm text-red-500'>{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors'
        >
          Retry
        </button>
      </div>
    )
  }
}

// Main page component
const CompanionsLibrary = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams
  const subject = params.subject || ''
  const topic = params.topic || ''

  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col max-sm:items-start'>
        <div>
          <h1>Companion Library</h1>
          <p className='text-gray-500 mt-1'>Browse and manage your AI companions</p>
        </div>
        <Suspense fallback={<SearchControlsFallback />}>
          <SearchControls />
        </Suspense>
      </section>

      <section className='companions-grid'>
        <Suspense 
          fallback={
            <>
              <p className='text-sm text-gray-500 mb-4 w-full'>Loading companions...</p>
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className='h-[280px] bg-gray-100 rounded-4xl border border-gray-200 animate-pulse'
                />
              ))}
            </>
          }
        >
          <CompanionsGrid subject={subject} topic={topic} />
        </Suspense>
      </section>
    </main>
  )
}

export default CompanionsLibrary
