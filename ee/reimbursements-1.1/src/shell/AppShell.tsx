import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { NavItem } from './nav'

interface AppShellProps {
  activeNav?: NavItem
  children: ReactNode
}

export function AppShell({ activeNav = 'wallet', children }: AppShellProps) {
  return (
    <div className="min-h-full md:bg-brand-dark-green md:p-6">
      <div className="flex min-h-full flex-col md:mx-auto md:min-h-[calc(100vh-3rem)] md:max-w-[1552px] md:flex-row md:gap-6">
        <Sidebar activeNav={activeNav} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
