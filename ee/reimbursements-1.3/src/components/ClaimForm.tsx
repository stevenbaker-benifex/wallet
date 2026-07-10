import { useEffect, useState } from 'react'
import type { ExtractedClaimData } from '@/types/receipt'
import { FormField, SelectInput, TextArea, TextInput } from './FormField'

interface ClaimFormProps {
  data: ExtractedClaimData
  showExtractButton?: boolean
  showFooter?: boolean
  showHeader?: boolean
  onExtract?: () => void
  onSubmit?: () => void
}

export function ClaimForm({
  data,
  showExtractButton = false,
  showFooter = true,
  showHeader = true,
  onExtract,
  onSubmit,
}: ClaimFormProps) {
  const [form, setForm] = useState(data)
  const [clearedAiFields, setClearedAiFields] = useState<Set<string>>(new Set())

  useEffect(() => {
    setForm(data)
    setClearedAiFields(new Set())
  }, [data])

  const update = (field: keyof ExtractedClaimData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (data.aiFields.includes(field as typeof data.aiFields[number])) {
      setClearedAiFields((prev) => new Set(prev).add(field))
    }
  }

  const showAi = (field: string) =>
    data.aiFields.includes(field as typeof data.aiFields[number]) && !clearedAiFields.has(field)

  return (
    <div className="flex h-full w-full flex-col">
      {/* scrollable content with 24px padding */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 lg:p-6">
        {showHeader && (
          <div className="flex items-center gap-1.5">
            <i className="fa-solid fa-receipt text-base text-grey-90" aria-hidden />
            <h2 className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">
              Claim details
            </h2>
          </div>
        )}

        {showExtractButton && onExtract && (
          <button
            type="button"
            onClick={onExtract}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-brand-dark-green bg-white px-4 font-button text-sm font-bold text-grey-90"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-base text-brand-dark-green" aria-hidden />
            Auto-fill from receipt
          </button>
        )}

        <div className="flex flex-col gap-4">
          <FormField label="Title" required ai={showAi('title')}>
            <TextInput value={form.title} onChange={(v) => update('title', v)} />
          </FormField>

          <FormField label="Spend period">
            <SelectInput value={form.spendPeriod} placeholder="Please select" />
          </FormField>

          <FormField label="Date of purchase" required>
            <TextInput
              value={form.dateOfPurchase}
              onChange={(v) => update('dateOfPurchase', v)}
              suffixIcon="fa-regular fa-calendar"
            />
          </FormField>

          <FormField label="Amount" required ai={showAi('amount')}>
            <TextInput
              value={form.amount}
              onChange={(v) => update('amount', v)}
              prefix="£"
            />
          </FormField>

          <FormField label="Claim type" required ai={showAi('claimType')}>
            <SelectInput value={form.claimType} />
          </FormField>

          <FormField label="Notes (optional)">
            <TextArea value={form.notes} onChange={(v) => update('notes', v)} />
          </FormField>
        </div>
      </div>

      {showFooter && (
        <div className="flex shrink-0 flex-col items-start gap-3 border-t border-grey-10 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          {data.aiFields.length > 0 && (
            <p className="font-body text-xs leading-[18px] tracking-wide text-grey-70">
              Please check fields populated using AI.
            </p>
          )}
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-brand-oregon px-4 font-button text-sm leading-[21px] text-white lg:ml-auto"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}
