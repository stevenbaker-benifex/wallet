import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesPanel } from '@/components/NotesPanel'
import { AppShell } from '@/shell/AppShell'
import { MobileHeader } from '@/shell/MobileHeader'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ReceiptList } from '@/components/ReceiptList'
import { MOCK_EXTRACTED_DATA, type ReceiptFile } from '@/types/receipt'

// ── Static claim data ─────────────────────────────────────────────────────────

const CLAIM = {
  title: 'Dental treatment',
  ref: 'Claim #12234',
  claimType: 'Health',
  allowance: 'Wellbeing Allowance',
  spendWindow: '1 Jan 2025 – 31 Dec 2026',
  dateOfPurchase: '12 Jun 2025',
  dateSubmitted: '15 Jun 2025 – 14:43',
  amount: '£124.00',
  balanceIfApproved: '£1,276.00',
}

// ── Pre-populated data ────────────────────────────────────────────────────────

const INITIAL_RECEIPTS: ReceiptFile[] = [
  {
    id: 'preset-1',
    name: 'Boots Pharmacy - prescription.pdf',
    type: 'pdf',
    status: 'complete',
    extractedData: MOCK_EXTRACTED_DATA,
  },
  {
    id: 'preset-2',
    name: 'IMG_0130.jpg',
    type: 'image',
    status: 'complete',
    extractedData: MOCK_EXTRACTED_DATA,
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-heading text-sm font-semibold leading-[21px] tracking-wide text-grey-90">
        {label}
      </span>
      <span className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{value}</span>
    </div>
  )
}

function ClaimDetailsContent() {
  return (
    <div className="flex flex-col gap-4 px-6 pb-6">
      <DetailRow label="Claim type" value={CLAIM.claimType} />
      <DetailRow label="Allowance" value={CLAIM.allowance} />
      <DetailRow label="Spend window" value={CLAIM.spendWindow} />
      <DetailRow label="Date of purchase" value={CLAIM.dateOfPurchase} />
      <DetailRow label="Date submitted" value={CLAIM.dateSubmitted} />
      <DetailRow label="Claim amount" value={CLAIM.amount} />
      <DetailRow label="Balance if approved" value={CLAIM.balanceIfApproved} />
    </div>
  )
}

function AccordionSection({
  icon,
  title,
  open,
  onToggle,
  children,
}: {
  icon: string
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-grey-10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-1.5">
          <i className={`${icon} text-base text-grey-90`} aria-hidden />
          <span className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">{title}</span>
        </div>
        <i
          className={`fa-solid fa-chevron-${open ? 'up' : 'down'} text-sm text-grey-50`}
          aria-hidden
        />
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function ViewClaimV2Page() {
  const navigate = useNavigate()
  const [receipts, setReceipts] = useState<ReceiptFile[]>(INITIAL_RECEIPTS)
  const [notesOpen, setNotesOpen] = useState(true)
  const [detailsOpen, setDetailsOpen] = useState(true)

  const removeReceipt = useCallback((id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id))
  }, [])

  // ── Right panel ──────────────────────────────────────────────────────────────

  const rightPanelContent = (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AccordionSection
          icon="fa-solid fa-receipt"
          title="Claim details"
          open={detailsOpen}
          onToggle={() => setDetailsOpen((v) => !v)}
        >
          <ClaimDetailsContent />
        </AccordionSection>

        <AccordionSection
          icon="fa-regular fa-comments"
          title="Notes (2)"
          open={notesOpen}
          onToggle={() => setNotesOpen((v) => !v)}
        >
          <div className="px-6 pb-6">
            <NotesPanel />
          </div>
        </AccordionSection>
      </div>

      {/* Sticky footer */}
      <div className="flex shrink-0 items-center gap-6 border-t border-grey-10 px-6 py-4">
        <button
          type="button"
          onClick={() => navigate('/edit-claim')}
          className="inline-flex h-9 items-center justify-center rounded-full bg-brand-oregon px-4 font-button text-sm leading-[21px] text-white"
        >
          Edit claim
        </button>
        <button
          type="button"
          className="font-body text-base leading-6 tracking-wide text-grey-90 underline underline-offset-2"
        >
          Cancel claim
        </button>
      </div>
    </div>
  )

  return (
    <AppShell activeNav="wallet">

      {/* ── MOBILE LAYOUT (hidden lg+) ── */}
      <div className="flex min-h-screen flex-col bg-grey-02 lg:hidden">
        <MobileHeader />

        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6">
          <div className="flex flex-col gap-4">
            <Breadcrumb label="Wellbeing Allowance" />

            <div className="flex flex-col gap-0.5">
              <h1 className="font-heading text-2xl font-semibold leading-[1.2] text-grey-90">
                {CLAIM.title}
              </h1>
              <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">{CLAIM.ref}</p>
            </div>

            {/* Rejection banner */}
            <div className="flex items-start gap-3 rounded-xl border border-negative bg-red-50 px-4 py-3">
              <i className="fa-regular fa-circle-xmark mt-0.5 text-negative" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <p className="font-heading text-xl font-semibold leading-[1.2] text-grey-90">
                  Claim rejected
                </p>
                <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                  Invalid receipt.
                </p>
              </div>
            </div>

            <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty />

            {/* Notes */}
            <div className="rounded-xl border-2 border-grey-05 bg-white p-4">
              <NotesPanel />
            </div>

            {/* Read-only claim details */}
            <div className="rounded-xl border-2 border-grey-05 bg-white p-4">
              <ClaimDetailsContent />
            </div>
          </div>
        </div>

        {/* Fixed mobile footer */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center gap-4 border-t border-grey-10 bg-white px-4 pb-6 pt-4">
          <button
            type="button"
            onClick={() => navigate('/edit-claim')}
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-brand-oregon font-button text-base text-white"
          >
            Edit claim
          </button>
          <button
            type="button"
            className="font-body text-base leading-6 tracking-wide text-grey-90 underline underline-offset-2"
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
            <h1 className="font-heading text-[32px] font-semibold leading-[1.2] text-grey-90">
              {CLAIM.title}
            </h1>
            <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{CLAIM.ref}</p>
          </div>

          {/* Rejection banner */}
          <div className="flex items-start gap-3 rounded-xl border border-negative bg-red-50 px-4 py-3">
            <i className="fa-regular fa-circle-xmark mt-0.5 text-negative" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <p className="font-heading text-xl font-semibold leading-[1.2] text-grey-90">
                Claim rejected
              </p>
              <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                Invalid receipt.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 border-t border-grey-10">

          {/* Left column */}
          <div className="flex min-w-[400px] flex-1 flex-col gap-8 overflow-y-auto border-r border-grey-10 p-8">
            <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty />
          </div>

          {/* Right column — accordion */}
          <div className="flex min-w-[400px] flex-1 flex-col overflow-hidden">
            {rightPanelContent}
          </div>

        </div>
      </div>

    </AppShell>
  )
}
