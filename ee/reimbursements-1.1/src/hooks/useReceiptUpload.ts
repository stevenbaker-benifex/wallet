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
      setActiveClaim(lastComplete?.extractedData ?? null)
      return next
    })
  }, [])

  const rightPanelState: RightPanelState = (() => {
    if (receipts.length === 0) return 'empty'
    if (receipts.some((r) => r.status === 'uploading' || r.status === 'extracting')) {
      return 'skeleton'
    }
    if (activeClaim && receipts.some((r) => r.status === 'complete')) return 'form'
    return 'empty'
  })()

  return {
    receipts,
    activeClaim,
    rightPanelState,
    addReceipt,
    removeReceipt,
  }
}

function deriveTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  if (base.toLowerCase().includes('boots')) return 'Boots Pharmacy'
  return base || MOCK_EXTRACTED_DATA.title
}
