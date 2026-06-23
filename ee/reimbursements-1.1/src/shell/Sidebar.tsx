import benifexLogo from '@/assets/benifex-logo.png'
import { NAV_ITEMS, type NavItem } from './nav'

interface SidebarProps {
  activeNav: NavItem
}

export function Sidebar({ activeNav }: SidebarProps) {
  return (
    <aside className="hidden w-[260px] shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-menu lg:flex">
      <div className="flex h-[90px] items-center px-4 py-4">
        <img src={benifexLogo} alt="Benifex" className="h-[49px] w-auto" />
      </div>

      <div className="h-px w-full bg-grey-10" />

      <div className="border-b border-brand-oat p-3">
        <div className="flex items-center gap-2 rounded-lg bg-grey-05 p-2">
          <i className="fa-solid fa-magnifying-glass text-base text-grey-90" aria-hidden />
          <span className="font-body text-base font-bold tracking-wide text-[#666666]">Search</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col p-3" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeNav
          const iconClass = item.iconStyle === 'solid' ? 'fa-solid' : 'fa-regular'

          return (
            <div
              key={item.id}
              className={`flex h-11 items-center rounded-lg px-3 py-1 ${
                isActive ? 'bg-brand-taupe' : 'bg-white'
              }`}
            >
              <div className="flex flex-1 items-center gap-2">
                <i
                  className={`${iconClass} ${item.icon} w-5 text-center text-base ${
                    isActive ? 'text-grey-80' : 'text-grey-50'
                  }`}
                  aria-hidden
                />
                <span
                  className={`font-heading text-base font-medium leading-4 ${
                    isActive ? 'text-grey-90 tracking-[-0.16px]' : 'text-grey-70'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </nav>

      <div className="flex items-center gap-2 border-t border-brand-taupe-border bg-brand-oat py-3 pl-6 pr-3">
        <div className="flex flex-1 items-center gap-2">
          <i className="fa-solid fa-circle-user text-base text-grey-50" aria-hidden />
          <span className="font-heading text-base font-medium leading-4 text-grey-90">Profile</span>
        </div>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full"
          aria-label="Toggle profile menu"
        >
          <i className="fa-solid fa-xmark text-base text-grey-70" aria-hidden />
        </button>
      </div>
    </aside>
  )
}
