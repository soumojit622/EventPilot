'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const BackToTopButton = () => {
    const [scrollY, setScrollY] = useState(0)
    const [visible, setVisible] = useState(false)

    // Update scroll position
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY
            const totalHeight = document.body.scrollHeight - window.innerHeight
            setScrollY(currentScroll / totalHeight)
            setVisible(currentScroll > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Circle stroke offset for progress
    const radius = 20
    const circumference = 2 * Math.PI * radius
    const offset = circumference - scrollY * circumference

    return (
        <button
            onClick={scrollToTop}
            className={`
        fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full
        bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg
        flex items-center justify-center transition-all duration-300
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
      `}
            aria-label="Back to top"
        >
            {/* Circular Progress */}
            <svg className="absolute w-14 h-14 -z-10" viewBox="0 0 48 48">
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="4"
                    fill="transparent"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="white"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-150 ease-out"
                />
            </svg>

            {/* Arrow Icon */}
            <ArrowUp className="w-6 h-6 relative z-10" />
        </button>
    )
}

export default BackToTopButton
