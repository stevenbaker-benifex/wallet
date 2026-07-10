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

const BLANK_CLAIM: ExtractedClaimData = {
  title: '',
  spendPeriod: '',
  dateOfPurchase: '',
  amount: '',
  claimType: '',
  notes: '',
  aiFields: [],
}

export function GetReimbursedPage() {
  const navigate = useNavigate()
  const {
    receipts,
    activeClaim,
    rightPanelState,
    autoFilledFromReceipt,
    showExtractButton,
    extractEnabled,
    addReceipt,
    extractFromReceipt,
    removeReceipt,
  } = useReceiptUpload()

  const claimData = activeClaim ?? BLANK_CLAIM
  const hasAiFields = claimData.aiFields.length > 0

  const handleFiles = (files: File[]) => {
    files.forEach(addReceipt)
  }

  const handleSubmit = () => navigate('/claim-submitted')

  return (
    <AppShell activeNav="wallet">

      {/* ── MOBILE LAYOUT (hidden lg+) ── */}
      <div className="flex min-h-screen flex-col bg-grey-02 lg:hidden">
        <MobileHeader />

        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6">
          <div className="flex flex-col gap-6">
            <Breadcrumb label="Wellbeing Allowance" />

            <MobileAddButton onFilesSelected={handleFiles} />

            {receipts.length > 0 && (
              <ReceiptList receipts={receipts} onRemove={removeReceipt} />
            )}

            <div className="overflow-hidden rounded-xl border-2 border-grey-05 bg-white">
              {rightPanelState === 'skeleton' ? (
                <ClaimFormSkeleton />
              ) : (
                <ClaimForm
                  data={claimData}
                  autoFilledFromReceipt={autoFilledFromReceipt}
                  showExtractButton={showExtractButton}
                  extractEnabled={extractEnabled}
                  showFooter={false}
                  onExtract={extractFromReceipt}
                />
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex flex-col gap-3 border-t border-grey-10 bg-white px-4 pb-6 pt-4">
          {hasAiFields && (
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
            <UploadZone onFilesSelected={handleFiles} />
            {receipts.length > 0 && (
              <ReceiptList receipts={receipts} onRemove={removeReceipt} />
            )}
          </div>

          {/* Right column — always visible */}
          <div className="flex w-[400px] flex-col overflow-hidden border-l border-grey-10">
            {rightPanelState === 'skeleton' ? (
              <ClaimFormSkeleton />
            ) : (
              <ClaimForm
                data={claimData}
                autoFilledFromReceipt={autoFilledFromReceipt}
                showExtractButton={showExtractButton}
                extractEnabled={extractEnabled}
                onExtract={extractFromReceipt}
                onSubmit={handleSubmit}
              />
            )}
          </div>

        </div>
      </div>

    </AppShell>
  )
}
