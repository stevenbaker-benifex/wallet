import receiptIllustration from '@/assets/receipt-illustration.png'
import { Button } from './Button'

export function EmptyStatePanel() {
  return (
    <div className="flex flex-col items-center">
      <img
        src={receiptIllustration}
        alt="Hand holding a card reader printing a receipt"
        className="h-[182px] w-[400px] object-cover"
      />
      <div className="flex w-full flex-col gap-6 lg:pt-6">
        <p className="text-center font-body text-base leading-6 tracking-wide text-grey-90">
          Add a receipt to start your reimbursement claim.
        </p>
        <Button variant="outline-dark" className="w-full">
          Claims guide
        </Button>
      </div>
    </div>
  )
}
