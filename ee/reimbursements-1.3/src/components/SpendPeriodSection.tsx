export interface SpendPeriod {
  id: string
  label: string
  available: string
}

export const SINGLE_SPEND_PERIOD: SpendPeriod = {
  id: '2026',
  label: '01 Jan 2026 - 31 Dec 2026',
  available: '£1,500.00',
}

export const MULTI_SPEND_PERIODS: SpendPeriod[] = [
  {
    id: '2026',
    label: '01 Jan 2026 - 31 Dec 2026',
    available: '£32',
  },
  {
    id: '2027',
    label: '01 Jan 2027 - 31 Dec 2027',
    available: '£1,500',
  },
]

interface SpendPeriodSectionProps {
  mode: 'single' | 'multi'
  selectedId: string
  onSelect: (id: string) => void
}

export function SpendPeriodSection({ mode, selectedId, onSelect }: SpendPeriodSectionProps) {
  if (mode === 'single') {
    return (
      <div className="flex w-full flex-col gap-1 rounded-lg bg-[#ebf2f4] px-4 py-2">
        <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">
          <span className="font-bold">{SINGLE_SPEND_PERIOD.available}</span>
          {' available'}
        </p>
        <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">
          You are claiming for the spend period
          <br />
          {SINGLE_SPEND_PERIOD.label}
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col rounded-lg bg-[#ebf2f4] p-3">
      <div className="mb-2 flex items-center gap-0.5">
        <span className="font-body text-sm font-bold leading-[21px] tracking-wide text-grey-90">
          Spend period
        </span>
        <i className="fa-solid fa-circle-info text-base text-[#306494]" aria-hidden />
      </div>

      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Spend period">
        {MULTI_SPEND_PERIODS.map((period) => {
          const selected = period.id === selectedId
          return (
            <label
              key={period.id}
              className="flex cursor-pointer items-start gap-3"
            >
              <span className="relative mt-px flex size-6 shrink-0 items-center justify-center">
                <input
                  type="radio"
                  name="spend-period"
                  value={period.id}
                  checked={selected}
                  onChange={() => onSelect(period.id)}
                  className="peer sr-only"
                />
                <span
                  className={`flex size-5 items-center justify-center rounded-full border-2 ${
                    selected
                      ? 'border-brand-dark-green bg-brand-dark-green'
                      : 'border-[#999999] bg-white'
                  }`}
                  aria-hidden
                >
                  {selected && <span className="size-2 rounded-full bg-white" />}
                </span>
              </span>
              <span className="pt-0.5 font-body text-sm leading-[21px] tracking-wide text-grey-90">
                {period.label} ({period.available} available)
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
