interface PageHeaderProps {
  title: string
  allowanceName?: string
}

export function PageHeader({ title, allowanceName }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-heading text-[32px] font-semibold leading-[1.2] text-grey-90">
        {title}
      </h1>
      {allowanceName && (
        <div className="flex items-center gap-0.5">
          <i className="fa-light fa-money-bill-transfer text-xs text-grey-90" aria-hidden />
          <p className="font-body text-sm leading-[21px] tracking-wide text-grey-90">
            {allowanceName}
          </p>
        </div>
      )}
    </div>
  )
}
