import '@/styles/shimmer.css'

export function ClaimFormSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 p-4 lg:p-6">
      <div className="shimmer h-9 rounded" />
      <div className="shimmer h-9 rounded" />
      <div className="shimmer h-9 rounded" />
      <div className="shimmer h-9 rounded" />
      <div className="shimmer h-9 rounded" />
      <div className="shimmer h-[88px] rounded" />
      <div className="shimmer h-9 w-[125px] rounded-full" />
    </div>
  )
}
