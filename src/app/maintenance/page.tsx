'use client'

import { useEffect, useState } from 'react'

export default function MaintenancePage() {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AdvancingTechnology
          </h1>
          <p className="text-slate-400 mt-2 text-lg">.dev</p>
        </div>

        {/* Maintenance Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
            <svg
              className="w-12 h-12 text-blue-400 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Under Maintenance
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            We&apos;re currently performing scheduled maintenance to improve your experience.
            We&apos;ll be back online shortly.
          </p>
          <div className="mt-6 text-blue-400 font-mono text-lg">
            Working on it{dots}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-slate-500 text-sm">
          <p>Questions? Contact us at</p>
          <a
            href="mailto:support@advancingtechnology.dev"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            support@advancingtechnology.dev
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} AdvancingTechnology. All rights reserved.
        </div>
      </div>
    </div>
  )
}
