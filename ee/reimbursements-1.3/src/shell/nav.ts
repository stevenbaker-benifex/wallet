export type NavItem = 'home' | 'wallet' | 'discounts' | 'recognition' | 'help'

export interface NavLink {
  id: NavItem
  label: string
  icon: string
  iconStyle?: 'regular' | 'solid'
}

export const NAV_ITEMS: NavLink[] = [
  { id: 'home', label: 'Home', icon: 'fa-house', iconStyle: 'solid' },
  { id: 'wallet', label: 'Wallet', icon: 'fa-wallet', iconStyle: 'solid' },
  { id: 'discounts', label: 'Discounts', icon: 'fa-percent', iconStyle: 'solid' },
  { id: 'recognition', label: 'Recognition', icon: 'fa-award', iconStyle: 'solid' },
  { id: 'help', label: 'Help & support', icon: 'fa-circle-question', iconStyle: 'solid' },
]
