import { useState } from 'react'
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

function ImagePreviewModal({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-full max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-white text-grey-70 shadow-md hover:bg-grey-05"
          aria-label="Close preview"
        >
          <i className="fa-solid fa-xmark text-base" aria-hidden />
        </button>
        <img
          src={src}
          alt={name}
          className="max-h-[85vh] w-full rounded-xl object-contain shadow-2xl"
        />
        <p className="mt-2 text-center font-body text-xs text-white/70">{name}</p>
      </div>
    </div>
  )
}

interface ReceiptListItemProps {
  receipt: ReceiptFile
  onRemove: (id: string) => void
}

export function ReceiptListItem({ receipt, onRemove }: ReceiptListItemProps) {
  const [showPreview, setShowPreview] = useState(false)
  const iconClass =
    receipt.type === 'pdf' ? 'fa-regular fa-file-pdf' : 'fa-regular fa-file-image'

  const isClickable = receipt.status === 'complete' && !!receipt.objectUrl

  const handleFileClick = () => {
    if (!isClickable || !receipt.objectUrl) return
    if (receipt.type === 'pdf') {
      window.open(receipt.objectUrl, '_blank')
    } else {
      setShowPreview(true)
    }
  }

  return (
    <>
      {showPreview && receipt.objectUrl && (
        <ImagePreviewModal
          src={receipt.objectUrl}
          name={receipt.name}
          onClose={() => setShowPreview(false)}
        />
      )}

      <div className="flex w-full items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleFileClick}
          disabled={!isClickable}
          className={`flex min-w-0 items-center gap-2 text-left ${
            isClickable ? 'cursor-pointer group' : 'cursor-default'
          }`}
        >
          <i className={`${iconClass} text-2xl text-grey-90`} aria-hidden />
          <p className={`truncate font-body text-xs leading-[18px] tracking-wide text-grey-90 ${
            isClickable ? 'underline underline-offset-2' : ''
          }`}>
            {receipt.name}
          </p>
        </button>

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
    </>
  )
}
