'use client'

import { useEffect, useState } from 'react'

interface DimensionProperties {
  scrollY: number
  totalHeight: number
  winHeight: number
}
const useWindowHeight = () => {
  const [dimensions, setDimensions] = useState<DimensionProperties>(() =>
    typeof window === 'undefined'
      ? { scrollY: 0, totalHeight: 0, winHeight: 0 }
      : {
          scrollY: window.scrollY,
          totalHeight: document.documentElement.scrollHeight,
          winHeight: window.innerHeight,
        }
  )

  useEffect(() => {
    const handleScroll = () => {
      setDimensions({
        scrollY: window.scrollY,
        totalHeight: document.documentElement.scrollHeight,
        winHeight: window.innerHeight,
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // console.log(scrollY);

  return dimensions
}

export default useWindowHeight
