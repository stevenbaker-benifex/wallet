interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <h1 className="font-heading text-[32px] font-semibold leading-[1.2] text-grey-90">{title}</h1>
  )
}
