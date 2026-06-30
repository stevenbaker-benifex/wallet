import type { ReceiptFile } from '@/types/receipt'
import { ReceiptListItem } from './ReceiptListItem'

interface ReceiptListProps {
  receipts: ReceiptFile[]
  onRemove: (id: string) => void
  showWhenEmpty?: boolean
}

export function ReceiptList({ receipts, onRemove, showWhenEmpty = false }: ReceiptListProps) {
  if (receipts.length === 0 && !showWhenEmpty) return null

  return (
    <div className="w-full rounded-xl border-2 border-grey-05 bg-white p-4 lg:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-paperclip text-base text-grey-90" aria-hidden />
          <h2 className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">
            Your receipts
          </h2>
        </div>

        {receipts.length === 0 ? (
          <p className="font-body text-sm text-grey-50">No receipts added.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {receipts.map((receipt) => (
              <ReceiptListItem key={receipt.id} receipt={receipt} onRemove={onRemove} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
