'use client'

import { useEffect, useState } from 'react'
import { Hourglass } from "lucide-react"
import { useTheme } from 'next-themes'
import { useLanguage } from '@/context/language-context'

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const { language } = useLanguage()

  useEffect(() => {
    document.body.style.display = 'block'
    document.documentElement.style.backgroundColor = ''
    
    setMounted(true)
    document.body.style.overflow = 'hidden'
    
    const timer = setTimeout(() => {
      document.body.style.overflow = ''
      setMounted(false)
      const style = document.querySelector('style#initial-loader')
      if (style) style.remove()
      const hexagonBg = document.getElementById('hexagon-bg')
      if (hexagonBg) hexagonBg.style.opacity = '0.75'
    }, 1000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [theme, language])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative h-24 w-24">
        <div className="animate-spin rounded-full h-full w-full border-t-2 border-b-2 border-primary" />
        <div className="absolute ease-in-out inset-0 flex items-center justify-center">
          <Hourglass className="h-8 w-8 text-primary" />
        </div>
      </div>
    </div>
  )
}