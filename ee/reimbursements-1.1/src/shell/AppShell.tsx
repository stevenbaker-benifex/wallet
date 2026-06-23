import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { NavItem } from './nav'

interface AppShellProps {
  activeNav?: NavItem
  children: ReactNode
}

export function AppShell({ activeNav = 'wallet', children }: AppShellProps) {
  return (
    <div className="min-h-full bg-brand-dark-green p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1552px] gap-6">
        <Sidebar activeNav={activeNav} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
