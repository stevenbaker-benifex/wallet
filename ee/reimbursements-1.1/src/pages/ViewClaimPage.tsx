import { useState } from 'react'
import { AppShell } from '@/shell/AppShell'
import { Breadcrumb } from '@/components/Breadcrumb'

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
    { name: 'Boots Pharmacy - prescription.pdf', icon: 'fa-solid fa-file-pdf' },
    { name: 'IMG_0130.jpg', icon: 'fa-regular fa-image' },
  ],
}

const NOTES = [
  {
    id: 1,
    date: '16 Jan 2024 – 14:10',
    initials: 'AB',
    text: 'Hi Catherine, we need both parts in order to approve this. Let me know if this is an issue',
    side: 'right' as const,
    color: 'bg-blue-50',
    avatarColor: 'bg-blue-500',
  },
  {
    id: 2,
    date: '15 Jan 2024 – 09:31',
    initials: 'CS',
    text: "Can't find part two of the receipt",
    footnote: 'Auto-translated',
    side: 'left' as const,
    color: 'bg-grey-05',
    avatarColor: 'bg-grey-50',
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

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
      <span className="w-48 shrink-0 font-heading text-sm font-semibold leading-[21px] tracking-wide text-grey-90">
        {label}
      </span>
      <span className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{value}</span>
    </div>
  )
}

function Avatar({ initials, colorClass }: { initials: string; colorClass: string }) {
  return (
    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${colorClass}`}>
      <span className="font-body text-xs font-bold leading-none text-white">{initials}</span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function ViewClaimPage() {
  const [noteText, setNoteText] = useState('')

  return (
    <AppShell activeNav="wallet">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white">

        {/* Header */}
        <div className="flex flex-col gap-6 p-8">
          <Breadcrumb label="Wellbeing Allowance" />

          <div className="flex flex-col gap-0.5">
            <h1 className="font-heading text-[32px] font-semibold leading-[1.2] text-grey-90">
              {CLAIM.title}
            </h1>
            <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{CLAIM.ref}</p>
          </div>

          {/* Status banner */}
          <div className="flex items-start gap-3 rounded-xl border border-[#FFBB33] bg-[#FFFBF0] px-4 py-3">
            <i className="fa-regular fa-circle-xmark mt-0.5 text-[#FFBB33]" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <p className="font-heading text-sm font-semibold leading-[21px] text-grey-90">Pending</p>
              <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                This claim has not been reviewed yet. Submitted: {CLAIM.dateSubmitted}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 border-t border-grey-10">

          {/* Left column */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden border-r border-grey-10">
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-8">

              {/* Amounts */}
              <SectionCard>
                <div className="flex divide-x-2 divide-grey-05">
                  <div className="flex flex-1 flex-col gap-1 p-6">
                    <p className="font-heading text-base font-semibold leading-[1.2] text-grey-90">
                      Claim amount
                    </p>
                    <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">
                      {CLAIM.amount}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-6">
                    <p className="font-heading text-base font-semibold leading-[1.2] text-grey-90">
                      Balance if approved
                    </p>
                    <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">
                      {CLAIM.balanceIfApproved}
                    </p>
                  </div>
                </div>
              </SectionCard>

              {/* Claim details */}
              <SectionCard className="flex flex-col gap-4 p-6">
                <SectionHeader icon="fa-solid fa-receipt" title="Claim details" />
                <div className="flex flex-col gap-3">
                  <DetailRow label="Claim type" value={CLAIM.claimType} />
                  <DetailRow label="Allowance" value={CLAIM.allowance} />
                  <DetailRow label="Spend window selected" value={CLAIM.spendWindow} />
                  <DetailRow label="Date of purchase" value={CLAIM.dateOfPurchase} />
                  <DetailRow label="Date submitted" value={CLAIM.dateSubmitted} />
                </div>
              </SectionCard>

              {/* Your receipts */}
              <SectionCard className="flex flex-col gap-6 p-6">
                <SectionHeader icon="fa-solid fa-paperclip" title="Your receipts" />
                <div className="flex flex-col gap-4">
                  {CLAIM.receipts.map((r) => (
                    <div key={r.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <i className={`${r.icon} text-2xl text-grey-90`} aria-hidden />
                        <span className="font-body text-xs leading-[18px] tracking-wide text-grey-90">
                          {r.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`Download ${r.name}`}
                        className="flex size-8 items-center justify-center rounded-full border border-grey-10 text-grey-70 transition-colors hover:bg-grey-05"
                      >
                        <i className="fa-solid fa-download text-sm" aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>

            </div>

            {/* Footer */}
            <div className="flex shrink-0 items-center gap-6 border-t border-grey-10 px-8 py-4">
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-full bg-brand-oregon px-5 font-button text-sm text-white"
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

          {/* Right column — Notes */}
          <div className="flex w-[400px] shrink-0 flex-col p-8">
            <SectionHeader icon="fa-regular fa-comments" title="Notes (2)" />

            <div className="mt-6 flex flex-col gap-4">
              {/* Note input */}
              <div className="flex items-center gap-2 rounded border border-grey-80 px-2 py-1.5">
                <input
                  type="text"
                  placeholder="Add a note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 bg-transparent font-body text-sm leading-[21px] tracking-wide text-grey-90 placeholder:text-grey-70 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Send note"
                  className="flex size-5 shrink-0 items-center justify-center text-grey-50"
                >
                  <i className="fa-solid fa-paper-plane text-sm" aria-hidden />
                </button>
              </div>

              {/* Messages */}
              {NOTES.map((note) => (
                <div key={note.id} className="flex flex-col gap-1">
                  <p
                    className={`font-body text-xs leading-[18px] tracking-wide text-grey-50 ${
                      note.side === 'right' ? 'pr-11 text-right' : 'pl-11'
                    }`}
                  >
                    {note.date}
                  </p>
                  <div
                    className={`flex items-end gap-2 ${
                      note.side === 'right' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <Avatar initials={note.initials} colorClass={note.avatarColor} />
                    <div
                      className={`flex flex-1 flex-col gap-1 px-4 py-2 ${note.color} ${
                        note.side === 'right'
                          ? 'rounded-tl-xl rounded-tr-xl rounded-bl-xl'
                          : 'rounded-tl-xl rounded-tr-xl rounded-br-xl'
                      }`}
                    >
                      <p className="font-body text-sm leading-[21px] text-grey-90">{note.text}</p>
                      {note.footnote && (
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-globe text-xs text-[#d1505f]" aria-hidden />
                          <span className="font-body text-xs leading-[18px] tracking-wide text-grey-90 underline">
                            {note.footnote}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  )
}
