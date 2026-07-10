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
      objectUrl: URL.createObjectURL(file),
    }

    setReceipts((prev) => [...prev, receipt])

    window.setTimeout(() => {
      setReceipts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'complete' } : item)),
      )
    }, UPLOAD_DURATION_MS)
  }, [])

  const extractFromReceipt = useCallback(() => {
    setReceipts((prev) => {
      const latestComplete = [...prev].reverse().find((r) => r.status === 'complete')
      if (!latestComplete) return prev

      const { id, name } = latestComplete

      window.setTimeout(() => {
        const extractedData = { ...MOCK_EXTRACTED_DATA, title: deriveTitle(name) }
        setReceipts((p) =>
          p.map((r) => (r.id === id ? { ...r, status: 'complete', extractedData } : r)),
        )
        setActiveClaim(extractedData)
      }, EXTRACT_DURATION_MS)

      return prev.map((r) => (r.id === id ? { ...r, status: 'extracting' } : r))
    })
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

  const isExtracting = receipts.some((r) => r.status === 'extracting')
  const rightPanelState: RightPanelState = isExtracting ? 'skeleton' : 'form'

  const canExtract =
    receipts.some((r) => r.status === 'complete') &&
    !receipts.some((r) => r.status === 'uploading' || r.status === 'extracting') &&
    !(activeClaim?.aiFields.length)

  /** Add a receipt to the list without triggering extraction or updating the form */
  const addReceiptSkipExtraction = useCallback((file: File) => {
    const id = createReceiptId()
    setReceipts((prev) => [
      ...prev,
      { id, name: file.name, type: getFileType(file.name), status: 'complete', objectUrl: URL.createObjectURL(file) },
    ])
  }, [])

  return {
    receipts,
    activeClaim,
    rightPanelState,
    canExtract,
    addReceipt,
    addReceiptSkipExtraction,
    extractFromReceipt,
    removeReceipt,
  }
}

function deriveTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  if (base.toLowerCase().includes('boots')) return 'Boots Pharmacy'
  return base || MOCK_EXTRACTED_DATA.title
}
