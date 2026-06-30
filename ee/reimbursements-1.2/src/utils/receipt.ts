function isAcceptedFile(file: File): boolean {
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return (
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.png') ||
    name.endsWith('.pdf') ||
    type === 'image/jpeg' ||
    type === 'image/png' ||
    type === 'application/pdf'
  )
}

export function createReceiptId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `receipt-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export { isAcceptedFile }
