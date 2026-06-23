import { useEffect, useState } from 'react'
import type { ExtractedClaimData } from '@/types/receipt'
import { FormField, SelectInput, TextArea, TextInput } from './FormField'

interface ClaimFormProps {
  data: ExtractedClaimData
  showFooter?: boolean
}

export function ClaimForm({ data, showFooter = true }: ClaimFormProps) {
  const [form, setForm] = useState(data)

  useEffect(() => {
    setForm(data)
  }, [data])

  const update = (field: keyof ExtractedClaimData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* scrollable content with 24px padding */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 lg:p-6">
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-receipt text-base text-grey-90" aria-hidden />
          <h2 className="font-heading text-lg font-semibold leading-[1.2] text-grey-90">
            Claim details
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <FormField label="Title" required ai={data.aiFields.includes('title')}>
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

          <FormField label="Amount" required ai={data.aiFields.includes('amount')}>
            <TextInput
              value={form.amount}
              onChange={(v) => update('amount', v)}
              prefix="£"
            />
          </FormField>

          <FormField label="Claim type" required ai={data.aiFields.includes('claimType')}>
            <SelectInput value={form.claimType} />
          </FormField>

          <FormField label="Notes (optional)">
            <TextArea value={form.notes} onChange={(v) => update('notes', v)} />
          </FormField>
        </div>
      </div>

      {showFooter && (
        <div className="flex shrink-0 flex-col items-start gap-3 border-t border-grey-10 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <p className="font-body text-xs leading-[18px] tracking-wide text-grey-70">
            Please check fields populated using AI.
          </p>
          <button
            type="button"
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-brand-oregon px-4 font-button text-sm leading-[21px] text-white"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}
