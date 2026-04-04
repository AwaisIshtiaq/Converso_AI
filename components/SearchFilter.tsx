'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { subjects } from '@/constants'

export default function SearchFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedSubject, setSelectedSubject] = useState('')

  useEffect(() => {
    const subject = searchParams.get('subject') || ''
    setSelectedSubject(subject)
  }, [searchParams])

  useEffect(() => {
    if (selectedSubject) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('subject', selectedSubject)
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [selectedSubject, router, pathname, searchParams])

  return (
    <select
      value={selectedSubject}
      onChange={(e) => setSelectedSubject(e.target.value)}
      className='border border-black rounded-lg px-3 py-1'
    >
      <option value=''>All Subjects</option>
      {subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </option>
      ))}
    </select>
  )
}
