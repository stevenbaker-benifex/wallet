interface BreadcrumbProps {
  label: string
  href?: string
}

export function Breadcrumb({ label, href = '#' }: BreadcrumbProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-0.5 font-body text-xs leading-[18px] text-grey-90 underline"
    >
      <i className="fa-solid fa-angle-left text-xs" aria-hidden />
      {label}
    </a>
  )
}
