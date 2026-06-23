import type { ReceiptFile } from '@/types/receipt'

function UploadSpinner() {
  return (
    <svg
      className="shrink-0 animate-spin"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        stroke="#cccccc"
        strokeWidth="2"
      />
      <path
        d="M7 1.5 A5.5 5.5 0 0 1 12.5 7"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface ReceiptListItemProps {
  receipt: ReceiptFile
  onRemove: (id: string) => void
}

export function ReceiptListItem({ receipt, onRemove }: ReceiptListItemProps) {
  const iconClass =
    receipt.type === 'pdf' ? 'fa-regular fa-file-pdf' : 'fa-regular fa-file-image'

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2">
        <i className={`${iconClass} text-2xl text-grey-90`} aria-hidden />
        <p className="truncate font-body text-xs leading-[18px] tracking-wide text-grey-90">
          {receipt.name}
        </p>
      </div>

      {receipt.status === 'uploading' && (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded px-1.5 py-0.5 font-button text-xs leading-[18px] text-grey-90">
          <UploadSpinner />
          Uploading
        </span>
      )}

      {receipt.status === 'extracting' && (
        <span className="inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 font-button text-xs leading-[18px] text-brand-purple">
          <i className="fa-solid fa-wand-magic-sparkles text-xs" aria-hidden />
          Extracting
        </span>
      )}

      {receipt.status === 'complete' && (
        <button
          type="button"
          onClick={() => onRemove(receipt.id)}
          className="flex size-6 shrink-0 items-center justify-center rounded-xl border border-negative text-negative"
          aria-label={`Remove ${receipt.name}`}
        >
          <i className="fa-regular fa-trash-can text-xs" aria-hidden />
        </button>
      )}
    </div>
  )
}
