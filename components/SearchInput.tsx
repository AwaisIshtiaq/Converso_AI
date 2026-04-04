'use client'

import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [isReady, setIsReady] = useState(false)
  const lastSearchRef = useRef('')

  // Initialize from URL on mount
  useEffect(() => {
    const topicFromUrl = searchParams.get('topic') || ''
    setSearchQuery(topicFromUrl)
    lastSearchRef.current = topicFromUrl
    setIsReady(true)
  }, [searchParams])

  // Handle search with debounce
  const handleSearch = useCallback((value: string) => {
    // Prevent duplicate searches
    if (value === lastSearchRef.current) return
    lastSearchRef.current = value
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (value && value.trim() !== '') {
      params.set('topic', value.trim())
    } else {
      params.delete('topic')
    }
    
    // Reset to first page when search changes
    params.delete('page')
    
    const newUrl = `${pathname}?${params.toString()}`
    console.log('SearchInput: Navigating to', newUrl)
    router.push(newUrl)
  }, [router, pathname, searchParams])

  // Debounce effect
  useEffect(() => {
    if (!isReady) return
    
    const timer = setTimeout(() => {
      handleSearch(searchQuery)
    }, 500) // 500ms debounce
    
    return () => clearTimeout(timer)
  }, [searchQuery, handleSearch, isReady])

  if (!isReady) {
    return (
      <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit bg-gray-100'>
        <Image src='/icons/search.svg' alt='search' width={15} height={16} />
        <input
          disabled
          placeholder='Loading...'
          className='outline-none bg-transparent'
        />
      </div>
    )
  }

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
      <Image src='/icons/search.svg' alt='search' width={15} height={16} />
      <input
        placeholder='Search by name or topic...'
        className='outline-none min-w-[200px]'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery('')}
          className='text-gray-500 hover:text-gray-700 px-1'
        >
          ✕
        </button>
      )}
    </div>
  )
}
