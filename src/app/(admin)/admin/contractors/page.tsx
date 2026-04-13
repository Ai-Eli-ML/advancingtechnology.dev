'use client'

import { useEffect, useState } from 'react'
import { getAllContractors } from '@/lib/queries/contractors'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-500',
  trial: 'bg-blue-500/10 text-blue-500',
  pending: 'bg-yellow-500/10 text-yellow-500',
  suspended: 'bg-red-500/10 text-red-500',
  offboarded: 'bg-muted text-muted-foreground',
}

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const c = await getAllContractors()
        setContractors(c || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)}</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contractors</h1>

      {contractors.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground">
          No contractors registered
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium hidden sm:table-cell">Email</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contractors.map(c => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {c.full_name}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{c.email}</td>
                  <td className="p-4 capitalize">{c.role}</td>
                  <td className="p-4">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", statusColors[c.status] || '')}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
