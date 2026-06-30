import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { NavItem } from './nav'

interface AppShellProps {
  activeNav?: NavItem
  children: ReactNode
  /** Allow page content to grow beyond viewport height instead of clipping at 100vh */
  grow?: boolean
}

export function AppShell({ activeNav = 'wallet', children, grow = false }: AppShellProps) {
  return (
    <div className={`min-h-full lg:bg-brand-dark-green lg:p-6 ${grow ? 'lg:min-h-full' : 'lg:h-full'}`}>
      <div className={`flex min-h-full flex-col lg:mx-auto lg:max-w-[1552px] lg:flex-row lg:gap-6 ${grow ? 'lg:min-h-full' : 'lg:h-full'}`}>
        {/* When grow is true the sidebar sticks to the viewport while main grows past it */}
        <div className={grow ? 'lg:sticky lg:top-6 lg:self-start lg:h-[calc(100vh-3rem)]' : 'contents'}>
          <Sidebar activeNav={activeNav} />
        </div>
        <main className={`min-w-0 flex-1 flex flex-col ${grow ? '' : 'min-h-0'}`}>{children}</main>
      </div>
    </div>
  )
}
