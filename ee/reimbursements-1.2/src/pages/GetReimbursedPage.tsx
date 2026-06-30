import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/shell/AppShell'
import { MobileHeader } from '@/shell/MobileHeader'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ClaimForm } from '@/components/ClaimForm'
import { ClaimFormSkeleton } from '@/components/ClaimFormSkeleton'
import { MobileAddButton } from '@/components/MobileAddButton'
import { PageHeader } from '@/components/PageHeader'
import { ReceiptList } from '@/components/ReceiptList'
import { UploadZone } from '@/components/UploadZone'
import { useReceiptUpload } from '@/hooks/useReceiptUpload'
import type { ExtractedClaimData } from '@/types/receipt'

// ── Types ──────────────────────────────────────────────────────────────────────

type UploadMode = 'auto-fill-all' | 'auto-fill-empty' | 'upload-only'

const UPLOAD_OPTIONS: { id: UploadMode; title: string; description: string }[] = [
  {
    id: 'auto-fill-all',
    title: 'Auto-fill all fields',
    description: "Overwrites any details you've already entered with data from the receipt",
  },
  {
    id: 'auto-fill-empty',
    title: 'Auto-fill empty fields only',
    description: "Fills in blank fields from the receipt, without changing anything you've already entered.",
  },
  {
    id: 'upload-only',
    title: "Upload only — I'll fill in the details",
    description: 'Just attaches the receipt as a file, no data extraction',
  },
]

const BLANK_CLAIM: ExtractedClaimData = {
  title: '',
  spendPeriod: '',
  dateOfPurchase: '',
  amount: '',
  claimType: '',
  notes: '',
  aiFields: [],
}

// ── Modal ──────────────────────────────────────────────────────────────────────

function ReceiptOptionsModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: (mode: UploadMode) => void
  onCancel: () => void
}) {
  const [selected, setSelected] = useState<UploadMode>('auto-fill-all')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-grey-70 hover:bg-grey-05"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark text-base" aria-hidden />
        </button>

        {/* Title */}
        <h2 className="text-center font-heading text-xl font-semibold leading-[1.2] text-grey-90">
          Receipt options
        </h2>

        {/* Options */}
        <div className="mt-6 flex flex-col gap-3">
          {UPLOAD_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors ${
                selected === option.id
                  ? 'border-brand-oregon bg-[#f0f5f3]'
                  : 'border-grey-10 hover:border-grey-20'
              }`}
            >
              <input
                type="radio"
                name="upload-mode"
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="mt-0.5 accent-brand-oregon"
              />
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-sm font-semibold leading-[21px] text-grey-90">
                  {option.title}
                </span>
                <span className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                  {option.description}
                </span>
              </div>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-9 items-center justify-center rounded-full border border-grey-20 bg-white px-5 font-button text-sm text-grey-70 hover:bg-grey-05"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(selected)}
            className="inline-flex h-9 items-center justify-center rounded-full bg-brand-dark-green px-5 font-button text-sm text-white"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function GetReimbursedPage() {
  const navigate = useNavigate()
  const { receipts, activeClaim, rightPanelState, addReceipt, addReceiptSkipExtraction, removeReceipt } =
    useReceiptUpload()
  const [manualMode, setManualMode] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[] | null>(null)

  const handleFiles = (files: File[]) => {
    if (manualMode || receipts.length > 0) {
      setPendingFiles(files)
    } else {
      files.forEach(addReceipt)
    }
  }

  const handleModalConfirm = (mode: UploadMode) => {
    if (!pendingFiles) return
    setPendingFiles(null)
    if (mode === 'upload-only') {
      pendingFiles.forEach(addReceiptSkipExtraction)
    } else {
      setManualMode(false)
      pendingFiles.forEach(addReceipt)
    }
  }

  const handleSubmit = () => navigate('/claim-submitted')
  const showRightCol = manualMode || rightPanelState !== 'empty'

  return (
    <AppShell activeNav="wallet">

      {/* ── MODAL ── */}
      {pendingFiles && (
        <ReceiptOptionsModal
          onConfirm={handleModalConfirm}
          onCancel={() => setPendingFiles(null)}
        />
      )}

      {/* ── MOBILE LAYOUT (hidden lg+) ── */}
      <div className="flex min-h-screen flex-col bg-grey-02 lg:hidden">
        <MobileHeader />

        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6">
          <div className="flex flex-col gap-6">
            <Breadcrumb label="Wellbeing Allowance" />

            <MobileAddButton onFilesSelected={handleFiles} />

            {!manualMode && rightPanelState === 'empty' && (
              <button
                type="button"
                onClick={() => setManualMode(true)}
                className="self-center font-body text-sm leading-[21px] tracking-wide text-grey-90 underline underline-offset-2 cursor-pointer"
              >
                Or enter claim manually
              </button>
            )}

            {(receipts.length > 0 || activeClaim) && (
              <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty={!!activeClaim} />
            )}

            {(rightPanelState !== 'empty' || manualMode) && (
              <div className="overflow-hidden rounded-xl border-2 border-grey-05 bg-white">
                {rightPanelState === 'skeleton' && <ClaimFormSkeleton />}
                {rightPanelState === 'form' && activeClaim && (
                  <ClaimForm data={activeClaim} showFooter={false} />
                )}
                {manualMode && rightPanelState === 'empty' && (
                  <ClaimForm data={BLANK_CLAIM} showFooter={false} />
                )}
              </div>
            )}
          </div>
        </div>

        {(rightPanelState === 'form' && activeClaim) || (manualMode && rightPanelState === 'empty') ? (
          <div className="fixed bottom-0 left-0 right-0 flex flex-col gap-3 border-t border-grey-10 bg-white px-4 pb-6 pt-4">
            {rightPanelState === 'form' && (
              <p className="text-center font-body text-xs leading-[18px] tracking-wide text-grey-70">
                Please check fields populated using AI.
              </p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              className="flex h-11 w-full items-center justify-center rounded-full bg-brand-oregon font-button text-base text-white"
            >
              Submit
            </button>
          </div>
        ) : null}
      </div>

      {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
      <div className="hidden flex-1 flex-col overflow-hidden rounded-2xl bg-white lg:flex">
        <div className="flex flex-col gap-6 p-8">
          <Breadcrumb label="Wellbeing Allowance" />
          <PageHeader title="Get reimbursed" />
        </div>

        <div className="flex min-h-0 flex-1 border-t border-grey-10">

          {/* Left column — scrolls independently */}
          <div className="flex min-w-[400px] flex-1 flex-col gap-8 overflow-y-auto p-8">
            <UploadZone onFilesSelected={handleFiles} showIllustration={receipts.length === 0} />
            <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty={!!activeClaim} />

            {!manualMode && rightPanelState === 'empty' && (
              <button
                type="button"
                onClick={() => setManualMode(true)}
                className="self-center font-body text-sm leading-[21px] tracking-wide text-grey-90 underline underline-offset-2 cursor-pointer"
              >
                Or enter claim manually
              </button>
            )}
          </div>

          {/* Right column — animates in when needed */}
          <div
            className={`flex flex-col overflow-hidden border-l border-grey-10 transition-all duration-300 ease-in-out ${
              showRightCol ? 'w-[400px]' : 'w-0'
            }`}
          >
            <div className="flex h-full w-[400px] flex-col overflow-hidden">
              {rightPanelState === 'skeleton' && <ClaimFormSkeleton />}
              {rightPanelState === 'form' && activeClaim && (
                <ClaimForm data={activeClaim} onSubmit={handleSubmit} />
              )}
              {manualMode && rightPanelState === 'empty' && (
                <ClaimForm data={BLANK_CLAIM} onSubmit={handleSubmit} />
              )}
            </div>
          </div>

        </div>
      </div>

    </AppShell>
  )
}
