'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { subjects } from '@/constants'

export default function SearchFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedSubject, setSelectedSubject] = useState('')
  const [isReady, setIsReady] = useState(false)

  // Initialize from URL on mount
  useEffect(() => {
    const subjectFromUrl = searchParams.get('subject') || ''
    setSelectedSubject(subjectFromUrl)
    setIsReady(true)
  }, [searchParams])

  // Handle filter change
  const handleFilterChange = useCallback((value: string) => {
    setSelectedSubject(value)
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (value && value !== '') {
      params.set('subject', value)
    } else {
      params.delete('subject')
    }
    
    // Reset to first page when filter changes
    params.delete('page')
    
    const newUrl = `${pathname}?${params.toString()}`
    console.log('SearchFilter: Navigating to', newUrl)
    router.push(newUrl)
  }, [router, pathname, searchParams])

  if (!isReady) {
    return (
      <select disabled className='border border-black rounded-lg px-3 py-1 bg-gray-100'>
        <option>Loading...</option>
      </select>
    )
  }

  return (
    <select
      value={selectedSubject}
      onChange={(e) => handleFilterChange(e.target.value)}
      className='border border-black rounded-lg px-3 py-1 cursor-pointer'
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
