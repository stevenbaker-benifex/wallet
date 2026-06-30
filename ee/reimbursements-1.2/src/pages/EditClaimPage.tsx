import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesPanel } from '@/components/NotesPanel'
import { AppShell } from '@/shell/AppShell'
import { MobileHeader } from '@/shell/MobileHeader'
import { MobileAddButton } from '@/components/MobileAddButton'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ClaimForm } from '@/components/ClaimForm'
import { ClaimFormSkeleton } from '@/components/ClaimFormSkeleton'
import { ReceiptList } from '@/components/ReceiptList'
import { UploadZone } from '@/components/UploadZone'
import {
  MOCK_EXTRACTED_DATA,
  UPLOAD_DURATION_MS,
  EXTRACT_DURATION_MS,
  type ExtractedClaimData,
  type ReceiptFile,
} from '@/types/receipt'
import { createReceiptId } from '@/utils/receipt'

// ── Pre-populated data ────────────────────────────────────────────────────────

const INITIAL_RECEIPTS: ReceiptFile[] = [
  {
    id: 'preset-1',
    name: 'Boots Pharmacy - prescription.pdf',
    type: 'pdf',
    status: 'complete',
    objectUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    extractedData: MOCK_EXTRACTED_DATA,
  },
  {
    id: 'preset-2',
    name: 'IMG_0130.jpg',
    type: 'image',
    status: 'complete',
    objectUrl: 'https://placehold.co/800x1100/f5f0eb/555555?text=Receipt',
    extractedData: MOCK_EXTRACTED_DATA,
  },
]

// ── Accordion section ─────────────────────────────────────────────────────────

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

export function EditClaimPage() {
  const navigate = useNavigate()
  const [receipts, setReceipts] = useState<ReceiptFile[]>(INITIAL_RECEIPTS)
  const [activeClaim, setActiveClaim] = useState<ExtractedClaimData>(MOCK_EXTRACTED_DATA)
  const [isExtracting, setIsExtracting] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(true)

  const addReceipt = useCallback((file: File) => {
    const id = createReceiptId()
    const newReceipt: ReceiptFile = {
      id,
      name: file.name,
      type: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
      status: 'uploading',
      objectUrl: URL.createObjectURL(file),
    }
    setReceipts((prev) => [...prev, newReceipt])
    setIsExtracting(true)

    window.setTimeout(() => {
      setReceipts((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'extracting' } : r)),
      )
      window.setTimeout(() => {
        const extracted = { ...MOCK_EXTRACTED_DATA }
        setReceipts((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: 'complete', extractedData: extracted } : r)),
        )
        setActiveClaim(extracted)
        setIsExtracting(false)
      }, EXTRACT_DURATION_MS)
    }, UPLOAD_DURATION_MS)
  }, [])

  const removeReceipt = useCallback((id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const handleFiles = (files: File[]) => files.forEach(addReceipt)

  // ── Right panel content ──────────────────────────────────────────────────────

  const rightPanelContent = (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">


        <AccordionSection
          icon="fa-solid fa-receipt"
          title="Claim details"
          open={detailsOpen}
          onToggle={() => setDetailsOpen((v) => !v)}
        >
          {isExtracting ? (
            <ClaimFormSkeleton />
          ) : (
            <ClaimForm data={activeClaim} showFooter={false} showHeader={false} />
          )}
        </AccordionSection>
        <AccordionSection
          icon="fa-regular fa-comments"
          title="Notes (2)"
          open={notesOpen}
          onToggle={() => setNotesOpen((v) => !v)}
        >
          <div className="px-6 pb-6">
            <NotesPanel showHeader={false} />
          </div>
        </AccordionSection>
      </div>

      {/* Sticky footer */}
      <div className="flex shrink-0 flex-col items-start gap-3 border-t border-grey-10 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-body text-xs leading-[18px] tracking-wide text-grey-70">
          Please check fields populated using AI.
        </p>
        <button
          type="button"
          onClick={() => navigate('/claim-submitted')}
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-brand-oregon px-4 font-button text-sm leading-[21px] text-white"
        >
          Submit
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
          <div className="flex flex-col gap-6">
            <Breadcrumb label="Wellbeing Allowance" />

            {/* Title */}
            <div className="flex flex-col gap-0.5">
              <h1 className="font-heading text-2xl font-semibold leading-[1.2] text-grey-90">
                Dental treatment
              </h1>
              <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">Claim #12234</p>
            </div>

            {/* Rejection banner */}
            <div className="flex items-start gap-3 rounded-xl border border-negative bg-red-50 px-4 py-3">
              <i className="fa-regular fa-circle-xmark mt-0.5 text-negative" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <p className="font-heading text-xl font-semibold leading-[1.2] text-grey-90">
                  Claim rejected
                </p>
                <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                  Invalid receipt.{' '}
                  {/* <a href="#" className="underline">
                    View all notes
                  </a> */}
                </p>
              </div>
            </div>

            {/* Form section */}
            <div className="overflow-hidden rounded-xl border-2 border-grey-05 bg-white">
              {isExtracting ? (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-1.5 px-4 pt-4">
                    <i className="fa-solid fa-receipt text-base text-grey-90" aria-hidden />
                    <h2 className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">
                      Claim details
                    </h2>
                  </div>
                  <ClaimFormSkeleton />
                </div>
              ) : (
                <ClaimForm data={activeClaim} showFooter={false} showHeader />
              )}
            </div>

           

            <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty />

            <MobileAddButton onFilesSelected={handleFiles} />

            {/* Notes */}
            <div className="rounded-xl border-2 border-grey-05 bg-white p-4">
              <NotesPanel />
            </div>
          </div>
        </div>

        {/* Fixed mobile footer */}
        <div className="fixed bottom-0 left-0 right-0 flex flex-col gap-3 border-t border-grey-10 bg-white px-4 pb-6 pt-4">
          <p className="text-center font-body text-xs leading-[18px] tracking-wide text-grey-70">
            Please check fields populated using AI.
          </p>
          <button
            type="button"
            onClick={() => navigate('/claim-submitted')}
            className="flex h-11 w-full items-center justify-center rounded-full bg-brand-oregon font-button text-base text-white"
          >
            Submit
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
              Dental treatment
            </h1>
            <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">Claim #12234</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 border-t border-grey-10">

          {/* Left column */}
          <div className="flex min-w-[400px] flex-1 flex-col gap-8 border-r border-grey-10 overflow-y-auto p-8">
            {/* Rejection banner */}
            <div className="flex items-start gap-3 rounded-xl border border-negative bg-red-50 px-4 py-3">
              <i className="fa-regular fa-circle-xmark mt-0.5 text-negative" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <p className="font-heading text-xl font-semibold leading-[1.2] text-grey-90">
                  Claim rejected
                </p>
                <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                  Invalid receipt.{' '}
                  {/* <a href="#" className="underline">
                    View all notes
                  </a> */}
                </p>
              </div>
            </div>
            <UploadZone onFilesSelected={handleFiles} />
            <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty />
          </div>

          {/* Right column — accordion */}
          <div className="flex h-full w-[400px] shrink-0 flex-col overflow-hidden">
            {rightPanelContent}
          </div>

        </div>
      </div>

    </AppShell>
  )
}
