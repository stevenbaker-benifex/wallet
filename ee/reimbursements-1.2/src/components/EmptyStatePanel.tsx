import receiptIllustration from '@/assets/receipt-illustration-2x.png'
import { Button } from './Button'

export function EmptyStatePanel() {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={receiptIllustration}
        alt="Hand holding a card reader printing a receipt"
        className="h-[120px] w-[400px] object-cover"
      />
        <div className="flex w-full flex-col items-center gap-6 lg:pt-6">
        <p className="text-center font-body text-base leading-6 tracking-wide text-grey-90">
          Not sure what you can claim for?
        </p>
        <Button variant="outline-dark">
          Claims guide
        </Button>
      </div>
    </div>
  )
}
