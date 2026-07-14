interface BreadcrumbProps {
  label: string
  href?: string
}

export function Breadcrumb({ label, href = '#' }: BreadcrumbProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-0.5 font-body text-xs leading-[18px] text-grey-90"
    >
      <i className="fa-light fa-angle-left text-xs" aria-hidden />
      <span className="underline">{label}</span>
    </a>
  )
}
