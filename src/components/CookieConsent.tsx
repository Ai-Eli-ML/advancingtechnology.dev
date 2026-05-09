'use client'

import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const CONSENT_KEY = 'at-cookie-consent'

type ConsentState = 'pending' | 'accepted' | 'rejected'

function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending'
  const stored = localStorage.getItem(CONSENT_KEY)
  if (stored === 'accepted' || stored === 'rejected') return stored
  return 'pending'
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setConsent(getStoredConsent())
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setConsent('rejected')
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      {mounted && consent === 'pending' && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4">
          <div className="mx-auto max-w-lg rounded-lg border bg-background p-4 shadow-lg">
            <p className="text-sm text-muted-foreground mb-3">
              We use analytics cookies to improve this portal.
              See our <a href="/privacy" className="underline hover:text-foreground">privacy policy</a>.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={reject}
                className="px-3 py-1.5 text-sm rounded-md border hover:bg-muted transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
