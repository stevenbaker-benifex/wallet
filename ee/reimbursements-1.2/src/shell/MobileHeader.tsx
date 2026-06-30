import benifexLogo from '@/assets/benifex-logo.png'

export function MobileHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-grey-10 bg-white px-4">
      <img src={benifexLogo} alt="Benifex" className="h-8 w-auto" />
      <div className="flex items-center gap-6">
        <i className="fa-solid fa-magnifying-glass text-2xl text-brand-oregon" aria-hidden />
        <i className="fa-solid fa-bars text-2xl text-grey-90" aria-hidden />
      </div>
    </header>
  )
}
