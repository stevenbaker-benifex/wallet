import { AppShell } from '@/shell/AppShell'
import { MobileHeader } from '@/shell/MobileHeader'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ClaimForm } from '@/components/ClaimForm'
import { ClaimFormSkeleton } from '@/components/ClaimFormSkeleton'
import { EmptyStatePanel } from '@/components/EmptyStatePanel'
import { MobileAddButton } from '@/components/MobileAddButton'
import { PageHeader } from '@/components/PageHeader'
import { ReceiptList } from '@/components/ReceiptList'
import { UploadZone } from '@/components/UploadZone'
import { useReceiptUpload } from '@/hooks/useReceiptUpload'

export function GetReimbursedPage() {
  const { receipts, activeClaim, rightPanelState, addReceipt, removeReceipt } = useReceiptUpload()
  const handleFiles = (files: File[]) => files.forEach(addReceipt)

  return (
    <AppShell activeNav="wallet">

      {/* ── MOBILE LAYOUT (hidden lg+) ── */}
      <div className="flex min-h-screen flex-col bg-grey-02 lg:hidden">
        <MobileHeader />

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6">
          <div className="flex flex-col gap-6">
            <Breadcrumb label="Wellbeing Allowance" />

            <MobileAddButton onFilesSelected={handleFiles} />

            {(receipts.length > 0 || activeClaim) && (
              <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty={!!activeClaim} />
            )}

            {rightPanelState !== 'empty' && (
              <div className="overflow-hidden rounded-xl border-2 border-grey-05 bg-white">
                {rightPanelState === 'skeleton' && <ClaimFormSkeleton />}
                {rightPanelState === 'form' && activeClaim && (
                  <ClaimForm data={activeClaim} showFooter={false} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* sticky mobile footer */}
        {rightPanelState === 'form' && activeClaim && (
          <div className="fixed bottom-0 left-0 right-0 flex flex-col gap-3 border-t border-grey-10 bg-white px-4 pb-6 pt-4">
            <p className="text-center font-body text-xs leading-[18px] tracking-wide text-grey-70">
              Please check fields populated using AI.
            </p>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center rounded-full bg-brand-oregon font-button text-base text-white"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
      <div className="hidden flex-1 flex-col overflow-hidden rounded-2xl bg-white lg:flex">
        <div className="flex flex-col gap-6 p-8">
          <Breadcrumb label="Wellbeing Allowance" />
          <PageHeader title="Get reimbursed" />
        </div>

        <div className="flex min-h-0 flex-1 border-t border-grey-10">
          <div className="flex min-w-[400px] flex-1 flex-col gap-8 border-r border-grey-10 p-8">
            <UploadZone onFilesSelected={handleFiles} />
            <ReceiptList receipts={receipts} onRemove={removeReceipt} showWhenEmpty={!!activeClaim} />
          </div>

          <div className="flex h-full w-[400px] shrink-0 flex-col overflow-hidden">
            {rightPanelState === 'empty' && <div className="p-6"><EmptyStatePanel /></div>}
            {rightPanelState === 'skeleton' && <ClaimFormSkeleton />}
            {rightPanelState === 'form' && activeClaim && <ClaimForm data={activeClaim} />}
          </div>
        </div>
      </div>

    </AppShell>
  )
}
