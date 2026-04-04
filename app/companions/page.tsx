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

function SearchControls() {
  return (
    <div className='flex gap-4'>
      <SearchInput />
      <SearchFilter />
    </div>
  )
}

const CompanionsLibrary = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams
  const subject = params.subject || ''
  const topic = params.topic || ''

  const { companions } = await getAllCompanions({ subject, topic })

  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col'>
        <h1>Companion Library</h1>
        <Suspense fallback={<div className='flex gap-4'><div className='w-32 h-10 bg-gray-200 rounded-lg' /><div className='w-32 h-10 bg-gray-200 rounded-lg' /></div>}>
          <SearchControls />
        </Suspense>
      </section>

      <section className='companion-grid'>
        {companions.length === 0 ? (
          <p>No companions found.</p>
        ) : (
          companions.map((companion: any) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        )}
      </section>
    </main>
  )
}

export default CompanionsLibrary
