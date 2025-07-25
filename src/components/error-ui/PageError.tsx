'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PageErrorProps {
  error: Error
  reset: () => void
}

export function PageError({ error, reset }: PageErrorProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Don&apos;t worry, we&apos;re on it!
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="rounded-md bg-muted p-4 text-left">
            <p className="text-sm font-mono text-muted-foreground break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}