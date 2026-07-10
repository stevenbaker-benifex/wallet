import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import receiptIllustration from '@/assets/receipt-illustration-2x.png'
import { isAcceptedFile } from '@/utils/receipt'

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void
  showIllustration?: boolean
}

export function UploadZone({ onFilesSelected, showIllustration = false }: UploadZoneProps) {
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
      className={`group flex w-full cursor-pointer items-center rounded-2xl border-2 border-dashed px-3 py-10 transition-colors ${
        isDragging
          ? 'border-brand-oregon bg-[#eaf3ed] ring-4 ring-brand-oregon/10'
          : 'border-grey-20 bg-grey-02 hover:border-brand-oregon hover:bg-[#f0f5f3]'
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

      <div className="flex w-full flex-col items-center justify-center gap-4">
        {showIllustration && !isDragging && (
          <img
            src={receiptIllustration}
            alt=""
            aria-hidden
            className="h-[120px] w-auto object-contain"
          />
        )}
        {showIllustration && isDragging && (
          <i className="fa-solid fa-arrow-up-from-bracket text-3xl text-brand-oregon" aria-hidden />
        )}

        <div className="flex flex-col items-center gap-4">
          <p className={`text-center font-body text-base font-bold leading-6 tracking-wide transition-colors ${
            isDragging ? 'text-brand-oregon' : 'text-grey-90 group-hover:text-brand-oregon'
          }`}>
            {isDragging ? 'Release to upload' : 'Drop a receipt here'}
          </p>
          {!isDragging && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                inputRef.current?.click()
              }}
              className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full border border-grey-20 bg-white px-4 py-2 font-button text-sm font-semibold leading-[21px] text-grey-70 transition-colors group-hover:border-brand-oregon group-hover:text-brand-oregon hover:bg-grey-05"
            >
              Add files
            </button>
          )}
        </div>

        <p className="mt-6 text-center font-body text-xs leading-[18px] tracking-wide text-grey-50">
          Supported formats: JPG, PNG, PDF
        </p>
      </div>
    </div>
  )
}
