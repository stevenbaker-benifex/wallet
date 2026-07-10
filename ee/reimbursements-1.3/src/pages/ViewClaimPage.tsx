import { useState } from 'react'
import { AppShell } from '@/shell/AppShell'
import { MobileHeader } from '@/shell/MobileHeader'
import { Breadcrumb } from '@/components/Breadcrumb'
import { NotesPanel } from '@/components/NotesPanel'

// ── Static data ────────────────────────────────────────────────────────────────

const CLAIM = {
  title: 'Dental treatment',
  ref: 'Claim #12234',
  amount: '£124.00',
  balanceIfApproved: '£1,276.00',
  claimType: 'Health',
  allowance: 'Wellbeing Allowance',
  spendWindow: '1 Jan 2025 – 31 Dec 2026',
  dateOfPurchase: '12 Jun 2025',
  dateSubmitted: '15 Jun 2025 – 14:43',
  receipts: [
    {
      name: 'Boots Pharmacy - prescription.pdf',
      icon: 'fa-solid fa-file-pdf',
      type: 'pdf' as const,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      name: 'IMG_0130.jpg',
      icon: 'fa-regular fa-image',
      type: 'image' as const,
      url: 'https://placehold.co/800x1100/f5f0eb/555555?text=Receipt',
    },
  ],
}

// ── Shared sub-components ──────────────────────────────────────────────────────

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border-2 border-grey-05 bg-white ${className}`}>
      {children}
    </div>
  )
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <i className={`${icon} text-base text-grey-90`} aria-hidden />
      <h2 className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">{title}</h2>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-40 shrink-0 font-heading text-sm font-semibold leading-[21px] tracking-wide text-grey-90">
        {label}
      </span>
      <span className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{value}</span>
    </div>
  )
}

function StatusBanner() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#FFBB33] bg-[#FFFBF0] px-4 py-3">
      <i className="fa-regular fa-clock mt-1 text-[#FFBB33]" aria-hidden />
      <div className="flex flex-col gap-0.5">
        <p className="font-heading text-xl font-semibold leading-[1.2] text-grey-90">Pending</p>
        <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
          This claim has not been reviewed yet.
        </p>
      </div>
    </div>
  )
}

function AmountsCard() {
  return (
    <SectionCard>
      <div className="flex divide-x-2 divide-grey-05">
        <div className="flex flex-1 flex-col gap-1 p-4 lg:p-6">
          <p className="font-heading text-base font-semibold leading-[1.2] text-grey-90">Claim amount</p>
          <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{CLAIM.amount}</p>
        </div>
        <div className="flex flex-1 flex-col gap-1 p-4 lg:p-6">
          <p className="font-heading text-base font-semibold leading-[1.2] text-grey-90">Balance if approved</p>
          <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{CLAIM.balanceIfApproved}</p>
        </div>
      </div>
    </SectionCard>
  )
}

function ClaimDetailsCard() {
  return (
    <SectionCard className="flex flex-col gap-4 p-4 lg:p-6">
      <SectionHeader icon="fa-solid fa-receipt" title="Claim details" />
      <div className="flex flex-col gap-3">
        <DetailRow label="Claim type" value={CLAIM.claimType} />
        <DetailRow label="Allowance" value={CLAIM.allowance} />
        <DetailRow label="Spend window" value={CLAIM.spendWindow} />
        <DetailRow label="Date of purchase" value={CLAIM.dateOfPurchase} />
        <DetailRow label="Date submitted" value={CLAIM.dateSubmitted} />
      </div>
    </SectionCard>
  )
}

function ImagePreviewModal({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-white text-grey-70 shadow-md hover:bg-grey-05"
          aria-label="Close preview"
        >
          <i className="fa-solid fa-xmark text-base" aria-hidden />
        </button>
        <img src={src} alt={name} className="max-h-[85vh] w-full rounded-xl object-contain shadow-2xl" />
        <p className="mt-2 text-center font-body text-xs text-white/70">{name}</p>
      </div>
    </div>
  )
}

function ReceiptsCard() {
  const [previewImage, setPreviewImage] = useState<{ src: string; name: string } | null>(null)

  const handleClick = (r: typeof CLAIM.receipts[number]) => {
    if (r.type === 'pdf') {
      window.open(r.url, '_blank')
    } else {
      setPreviewImage({ src: r.url, name: r.name })
    }
  }

  return (
    <>
      {previewImage && (
        <ImagePreviewModal
          src={previewImage.src}
          name={previewImage.name}
          onClose={() => setPreviewImage(null)}
        />
      )}
      <SectionCard className="flex flex-col gap-4 p-4 lg:p-6">
        <SectionHeader icon="fa-solid fa-paperclip" title="Your receipts" />
        <div className="flex flex-col gap-4">
          {CLAIM.receipts.map((r) => (
            <div key={r.name} className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleClick(r)}
                className="flex min-w-0 items-center gap-2 text-left cursor-pointer"
              >
                <i className={`${r.icon} text-2xl text-grey-90`} aria-hidden />
                <span className="truncate font-body text-xs leading-[18px] tracking-wide text-grey-90 underline underline-offset-2">
                  {r.name}
                </span>
              </button>
              <button
                type="button"
                aria-label={`Download ${r.name}`}
                className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-full border border-grey-10 text-grey-70 transition-colors hover:bg-grey-05"
              >
                <i className="fa-solid fa-download text-sm" aria-hidden />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  )
}


// ── Page ──────────────────────────────────────────────────────────────────────

export function ViewClaimPage() {
  return (

    <AppShell activeNav="wallet">

      {/* ── MOBILE LAYOUT (hidden lg+) ── */}
      <div className="flex min-h-screen flex-col bg-grey-02 lg:hidden">
        <MobileHeader />

        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6">
          <div className="flex flex-col gap-6">
            <Breadcrumb label="Wellbeing Allowance" />

            <div className="flex flex-col gap-0.5">
              <h1 className="font-heading text-2xl font-semibold leading-[1.2] text-grey-90">{CLAIM.title}</h1>
              <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">{CLAIM.ref}</p>
            </div>

            <StatusBanner />
            <AmountsCard />
            <ClaimDetailsCard />
            <ReceiptsCard />

            <SectionCard className="p-4">
              <NotesPanel />
            </SectionCard>
          </div>
        </div>

        {/* fixed mobile footer */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center gap-4 border-t border-grey-10 bg-white px-4 pb-6 pt-4">
          {/* <button
            type="button"
            onClick={() => navigate('/edit-claim')}
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-brand-oregon font-button text-base text-white"
          >
            Edit claim
          </button> */}
          <button
            type="button"
            className="font-body text-base leading-6 tracking-wide text-grey-90 underline underline-offset-2 cursor-pointer hover:text-[#AE0000]"
          >
            Cancel claim
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
      <div className="hidden flex-1 flex-col overflow-hidden rounded-2xl bg-white lg:flex">

        {/* Header */}
        <div className="flex flex-col gap-6 p-8">
          <Breadcrumb label="Wellbeing Allowance" />
          <div className="flex flex-col gap-0.5">
            <h1 className="font-heading text-[32px] font-semibold leading-[1.2] text-grey-90">{CLAIM.title}</h1>
            <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{CLAIM.ref}</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 border-t border-grey-10">

          {/* Left column */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden border-r border-grey-10">
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-8">
              <StatusBanner />
              <AmountsCard />
              <ClaimDetailsCard />
              <ReceiptsCard />
            </div>

            {/* Footer */}
            <div className="flex shrink-0 items-center gap-6 border-t border-grey-10 px-8 py-4">
              {/* <button
                type="button"
                onClick={() => navigate('/edit-claim')}
                className="inline-flex h-9 items-center justify-center rounded-full bg-brand-oregon px-5 font-button text-sm text-white"
              >
                Edit claim
              </button> */}
              <button
                type="button"
                className="font-body text-base leading-6 tracking-wide text-grey-90 underline underline-offset-2 cursor-pointer hover:text-[#AE0000]"
              >
                Cancel claim
              </button>
            </div>
          </div>

          {/* Right column — Notes */}
          <div className="flex w-[400px] shrink-0 flex-col overflow-y-auto p-8">
            <NotesPanel />
          </div>

        </div>
      </div>

    </AppShell>
  )
}
