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
        title="Dashboard data unavailable"
        description="We couldn't load your dashboard data. This might be a temporary issue."
      />
    </div>
  )
}