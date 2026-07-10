import { useRef, type ChangeEvent } from 'react'
import { isAcceptedFile } from '@/utils/receipt'

interface MobileAddButtonProps {
  onFilesSelected: (files: File[]) => void
}

export function MobileAddButton({ onFilesSelected }: MobileAddButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter(isAcceptedFile)
    if (files.length) onFilesSelected(files)
    event.target.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        multiple
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-brand-oregon bg-white font-button text-base font-normal text-grey-90"
      >
        <i className="fa-regular fa-plus text-base text-brand-oregon" aria-hidden />
        Add receipt(s)
      </button>
    </>
  )
}
