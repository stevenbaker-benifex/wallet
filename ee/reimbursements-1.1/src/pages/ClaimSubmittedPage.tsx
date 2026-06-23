import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/shell/AppShell'
import { MobileHeader } from '@/shell/MobileHeader'
import { Breadcrumb } from '@/components/Breadcrumb'

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-48 shrink-0 font-heading text-sm font-semibold leading-[21px] tracking-wide text-grey-90">
        {label}
      </span>
      <span className="font-body text-sm leading-[21px] tracking-wide text-grey-90">{value}</span>
    </div>
  )
}

export function ClaimSubmittedPage() {
  const navigate = useNavigate()

  const footer = (
    <div className="flex shrink-0 items-center gap-3 border-t border-grey-10 px-8 py-4">
      <button
        type="button"
        onClick={() => navigate('/get-reimbursed')}
        className="inline-flex h-9 items-center justify-center rounded-full bg-brand-oregon px-5 font-button text-sm text-white"
      >
        Submit another claim
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="inline-flex h-9 items-center justify-center rounded-full border border-grey-20 px-5 font-button text-sm text-grey-80"
      >
        Done
      </button>
    </div>
  )

  return (
    <AppShell activeNav="wallet">

      {/* ── MOBILE LAYOUT (hidden lg+) ── */}
      <div className="flex min-h-screen flex-col bg-grey-02 lg:hidden">
        <MobileHeader />

        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6">
          <div className="flex flex-col gap-4">
            <Breadcrumb label="Wellbeing Allowance" />

            <h1 className="font-heading text-2xl font-semibold leading-[1.2] text-grey-90">
              Dental treatment
            </h1>

            {/* Success banner */}
            <div className="flex items-start gap-3 rounded-xl border border-[#3AAB52] bg-[#F0FAF2] px-4 py-3">
              <i className="fa-regular fa-circle-check mt-0.5 text-[#3AAB52]" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <p className="font-heading text-xl font-semibold leading-[1.2] text-grey-90">
                  Claim submitted
                </p>
                <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                  You'll receive an email when this has been reviewed.
                </p>
              </div>
            </div>

            {/* Summary card */}
            <div className="rounded-xl border-2 border-grey-05 bg-white p-4">
              <div className="flex flex-col gap-3">
                <DetailRow label="Claim" value="Boots Pharmacy" />
                <DetailRow label="Claim amount" value="£46.00" />
                <DetailRow label="Claim reference" value="#12234" />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed mobile footer */}
        <div className="fixed bottom-0 left-0 right-0 flex flex-col gap-3 border-t border-grey-10 bg-white px-4 pb-6 pt-4">
          <button
            type="button"
            onClick={() => navigate('/get-reimbursed')}
            className="flex h-11 w-full items-center justify-center rounded-full bg-brand-oregon font-button text-base text-white"
          >
            Submit another claim
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex h-11 w-full items-center justify-center rounded-full border border-grey-20 font-button text-base text-grey-80"
          >
            Done
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
      <div className="hidden flex-1 flex-col overflow-hidden rounded-2xl bg-white lg:flex">

        {/* Header */}
        <div className="flex flex-col gap-6 p-8">
          <Breadcrumb label="Wellbeing Allowance" />

          <h1 className="font-heading text-[32px] font-semibold leading-[1.2] text-grey-90">
            Dental treatment
          </h1>

          {/* Success banner */}
          <div className="flex items-start gap-3 rounded-xl border border-[#3AAB52] bg-[#F0FAF2] px-4 py-3">
            <i className="fa-regular fa-circle-check mt-0.5 text-[#3AAB52]" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <p className="font-heading text-xl font-semibold leading-[1.2] text-grey-90">
                Claim submitted
              </p>
              <p className="font-body text-sm leading-[21px] tracking-wide text-grey-70">
                You'll receive an email when this has been reviewed.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-grey-10">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="rounded-xl border-2 border-grey-05 bg-white p-6">
              <div className="flex flex-col gap-3">
                <DetailRow label="Claim" value="Boots Pharmacy" />
                <DetailRow label="Claim amount" value="£46.00" />
                <DetailRow label="Claim reference" value="#12234" />
              </div>
            </div>
          </div>

          {footer}
        </div>

      </div>

    </AppShell>
  )
}
