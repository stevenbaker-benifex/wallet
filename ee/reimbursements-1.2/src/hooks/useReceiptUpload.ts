import { useCallback, useState } from 'react'
import {
  EXTRACT_DURATION_MS,
  MOCK_EXTRACTED_DATA,
  UPLOAD_DURATION_MS,
  type ExtractedClaimData,
  type ReceiptFile,
} from '@/types/receipt'
import { createReceiptId } from '@/utils/receipt'

function getFileType(name: string): 'pdf' | 'image' {
  return name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image'
}

export type RightPanelState = 'empty' | 'skeleton' | 'form'

export function useReceiptUpload() {
  const [receipts, setReceipts] = useState<ReceiptFile[]>([])
  const [activeClaim, setActiveClaim] = useState<ExtractedClaimData | null>(null)

  const addReceipt = useCallback((file: File) => {
    const id = createReceiptId()
    const receipt: ReceiptFile = {
      id,
      name: file.name,
      type: getFileType(file.name),
      status: 'uploading',
    }

    setReceipts((prev) => [...prev, receipt])
    setActiveClaim(null)

    window.setTimeout(() => {
      setReceipts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'extracting' } : item)),
      )

      window.setTimeout(() => {
        const extractedData = { ...MOCK_EXTRACTED_DATA, title: deriveTitle(file.name) }
        setReceipts((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: 'complete', extractedData } : item,
          ),
        )
        setActiveClaim(extractedData)
      }, EXTRACT_DURATION_MS)
    }, UPLOAD_DURATION_MS)
  }, [])

  const removeReceipt = useCallback((id: string) => {
    setReceipts((prev) => {
      const next = prev.filter((item) => item.id !== id)
      const lastComplete = [...next].reverse().find((item) => item.status === 'complete')
      // only clear the claim if another complete receipt exists to replace it;
      // if all receipts are gone, keep the form visible for validation on submit
      if (lastComplete) setActiveClaim(lastComplete.extractedData ?? null)
      return next
    })
  }, [])

  const rightPanelState: RightPanelState = (() => {
    if (receipts.some((r) => r.status === 'uploading' || r.status === 'extracting')) {
      return 'skeleton'
    }
    if (activeClaim) return 'form'
    return 'empty'
  })()

  /** Add a receipt to the list without triggering extraction or updating the form */
  const addReceiptSkipExtraction = useCallback((file: File) => {
    const id = createReceiptId()
    setReceipts((prev) => [
      ...prev,
      { id, name: file.name, type: getFileType(file.name), status: 'complete' },
    ])
  }, [])

  return {
    receipts,
    activeClaim,
    rightPanelState,
    addReceipt,
    addReceiptSkipExtraction,
    removeReceipt,
  }
}

function deriveTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  if (base.toLowerCase().includes('boots')) return 'Boots Pharmacy'
  return base || MOCK_EXTRACTED_DATA.title
}
