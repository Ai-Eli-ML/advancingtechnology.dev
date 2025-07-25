'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react'

interface ApiErrorProps {
  error: Error
  reset: () => void
  title?: string
  description?: string
}

export function ApiError({
  error,
  reset,
  title = "Failed to load data",
  description = "There was a problem fetching the data. Please check your connection and try again."
}: ApiErrorProps) {
  const isNetworkError = error.message.toLowerCase().includes('network') || 
                        error.message.toLowerCase().includes('fetch')

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {isNetworkError ? (
            <WifiOff className="h-5 w-5 text-destructive" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-destructive" />
          )}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {process.env.NODE_ENV === 'development' && (
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs font-mono text-muted-foreground">
              {error.message}
            </p>
          </div>
        )}
        <Button onClick={reset} className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}