import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { NavItem } from './nav'

interface AppShellProps {
  activeNav?: NavItem
  children: ReactNode
}

export function AppShell({ activeNav = 'wallet', children }: AppShellProps) {
  return (
    <div className="min-h-full lg:bg-brand-dark-green lg:p-6">
      <div className="flex min-h-full flex-col lg:mx-auto lg:min-h-[calc(100vh-3rem)] lg:max-w-[1552px] lg:flex-row lg:gap-6">
        <Sidebar activeNav={activeNav} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
