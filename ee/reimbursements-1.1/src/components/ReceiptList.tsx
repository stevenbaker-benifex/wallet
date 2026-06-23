import type { ReceiptFile } from '@/types/receipt'
import { ReceiptListItem } from './ReceiptListItem'

interface ReceiptListProps {
  receipts: ReceiptFile[]
  onRemove: (id: string) => void
}

export function ReceiptList({ receipts, onRemove }: ReceiptListProps) {
  if (receipts.length === 0) return null

  return (
    <div className="w-full rounded-xl border-2 border-grey-05 p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-1.5">
          <i className="fa-regular fa-paperclip text-base text-grey-90" aria-hidden />
          <h2 className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">
            Your receipts
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {receipts.map((receipt) => (
            <ReceiptListItem key={receipt.id} receipt={receipt} onRemove={onRemove} />
          ))}
        </div>
      </div>
    </div>
  )
}
