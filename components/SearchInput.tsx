'use client'

import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

export default function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const topic = searchParams.get('topic') || ''
  const [searchQuery, setSearchQuery] = useState(topic)

  const handleSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('topic', value)
    } else {
      params.delete('topic')
    }
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, handleSearch])

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
      <Image src='/icons/search.svg' alt='search' width={15} height={16} />
      <input
        placeholder='Search Companion'
        className='outline-none'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
