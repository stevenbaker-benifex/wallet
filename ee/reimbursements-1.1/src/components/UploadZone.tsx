import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { isAcceptedFile } from '@/utils/receipt'

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void
}

export function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragDepth = useRef(0)

  const processFiles = (fileList: FileList | null | undefined) => {
    if (!fileList?.length) return
    const accepted = Array.from(fileList).filter(isAcceptedFile)
    if (accepted.length) onFilesSelected(accepted)
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFiles(event.target.files)
    event.target.value = ''
  }

  const onDragEnter = (event: DragEvent) => {
    event.preventDefault()
    dragDepth.current += 1
    setIsDragging(true)
  }

  const onDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  const onDragLeave = (event: DragEvent) => {
    event.preventDefault()
    dragDepth.current -= 1
    if (dragDepth.current <= 0) {
      dragDepth.current = 0
      setIsDragging(false)
    }
  }

  const onDrop = (event: DragEvent) => {
    event.preventDefault()
    dragDepth.current = 0
    setIsDragging(false)
    processFiles(event.dataTransfer.files)
  }

  return (
    <div
      className={`flex min-h-[280px] w-full cursor-pointer items-center rounded-2xl border-2 border-dashed px-3 py-12 transition-colors ${
        isDragging ? 'border-brand-oregon bg-[#f7f3ed]' : 'border-grey-20 bg-grey-02'
      }`}
      onClick={() => inputRef.current?.click()}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* visually hidden but accessible file input */}
      <input
        ref={inputRef}
        id="receipt-upload"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        multiple
        style={{ display: 'none' }}
        onChange={onInputChange}
      />

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <p className="text-center font-body text-base font-bold leading-6 tracking-wide text-grey-90">
            Drop receipt(s) here
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              inputRef.current?.click()
            }}
            className="inline-flex h-9 items-center justify-center rounded-full border border-grey-20 bg-white px-4 py-2 font-button text-sm font-semibold leading-[21px] text-grey-70 hover:bg-grey-05"
          >
            or browse
          </button>
        </div>
        <p className="max-w-[560px] text-center font-body text-xs leading-[18px] tracking-wide text-grey-90">
          Supported formats: JPG, PNG, PDF
        </p>
      </div>
    </div>
  )
}
