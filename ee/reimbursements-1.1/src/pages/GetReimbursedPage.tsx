import { AppShell } from '@/shell/AppShell'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ClaimForm } from '@/components/ClaimForm'
import { ClaimFormSkeleton } from '@/components/ClaimFormSkeleton'
import { EmptyStatePanel } from '@/components/EmptyStatePanel'
import { PageHeader } from '@/components/PageHeader'
import { ReceiptList } from '@/components/ReceiptList'
import { UploadZone } from '@/components/UploadZone'
import { useReceiptUpload } from '@/hooks/useReceiptUpload'

export function GetReimbursedPage() {
  const { receipts, activeClaim, rightPanelState, addReceipt, removeReceipt } = useReceiptUpload()

  return (
    <AppShell activeNav="wallet">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white">
        <div className="flex flex-col gap-6 p-8">
          <Breadcrumb label="Wellbeing Allowance" />
          <PageHeader title="Get reimbursed" />
        </div>

        <div className="flex min-h-0 flex-1 border-t border-grey-10">
          <div className="flex min-w-0 flex-1 flex-col gap-8 border-r border-grey-10 p-8">
            <UploadZone onFilesSelected={(files) => files.forEach(addReceipt)} />
            <ReceiptList receipts={receipts} onRemove={removeReceipt} />
          </div>

          <div className="flex h-full w-[464px] shrink-0 flex-col overflow-hidden">
            {rightPanelState === 'empty' && <EmptyStatePanel />}
            {rightPanelState === 'skeleton' && <ClaimFormSkeleton />}
            {rightPanelState === 'form' && activeClaim && <ClaimForm data={activeClaim} />}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
