'use client'

import { ApiError } from '@/components/error-ui/ApiError'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-8">
      <ApiError 
        error={error} 
        reset={reset}
        title="Marketplace unavailable"
        description="We couldn't load the marketplace. Please check your connection and try again."
      />
    </div>
  )
}