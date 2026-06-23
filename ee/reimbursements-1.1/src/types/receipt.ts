export type ReceiptStatus = 'uploading' | 'extracting' | 'complete'

export interface ExtractedClaimData {
  title: string
  spendPeriod: string
  dateOfPurchase: string
  amount: string
  claimType: string
  notes: string
  aiFields: Array<'title' | 'amount' | 'claimType'>
}

export interface ReceiptFile {
  id: string
  name: string
  type: 'pdf' | 'image'
  status: ReceiptStatus
  extractedData?: ExtractedClaimData
}

export const MOCK_EXTRACTED_DATA: ExtractedClaimData = {
  title: 'Boots Pharmacy',
  spendPeriod: '',
  dateOfPurchase: '18 Jun 2026',
  amount: '46.00',
  claimType: 'Healthcare',
  notes: '',
  aiFields: ['title', 'amount', 'claimType'],
}

export const UPLOAD_DURATION_MS = 3000
export const EXTRACT_DURATION_MS = 5000
