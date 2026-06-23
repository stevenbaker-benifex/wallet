import type { ReactNode } from 'react'
import { AiBadge } from './AiBadge'

interface FormFieldProps {
  label: string
  required?: boolean
  ai?: boolean
  children: ReactNode
}

export function FormField({ label, required, ai, children }: FormFieldProps) {
  return (
    <div className="relative w-full max-w-[400px]">
      <div className="mb-2 flex items-center gap-0.5">
        <label className="font-body text-base font-bold leading-6 tracking-wide text-grey-90">
          {label}
        </label>
        {required && <span className="text-xs text-negative">*</span>}
        {ai && (
          <span className="absolute right-0 top-0">
            <AiBadge />
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

interface TextInputProps {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  prefix?: string
  suffixIcon?: string
}

export function TextInput({ value, onChange, placeholder, prefix, suffixIcon }: TextInputProps) {
  return (
    <div className="flex h-9 items-center overflow-hidden rounded border border-[#999999] bg-white">
      {prefix && (
        <div className="flex h-full items-center border-r border-[#999999] px-2">
          <span className="font-body text-sm text-grey-90">{prefix}</span>
        </div>
      )}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-w-0 flex-1 bg-transparent px-2 font-body text-sm leading-[21px] tracking-wide text-grey-90 outline-none"
      />
      {suffixIcon && (
        <div className="flex size-5 shrink-0 items-center justify-center pr-2">
          <i className={`${suffixIcon} text-base text-brand-oregon`} aria-hidden />
        </div>
      )}
    </div>
  )
}

interface SelectInputProps {
  value: string
  placeholder?: string
}

export function SelectInput({ value, placeholder }: SelectInputProps) {
  return (
    <div className="flex h-9 items-center justify-between rounded border border-[#999999] bg-white px-2">
      <span className={`font-body text-sm leading-[21px] tracking-wide ${value ? 'text-grey-90' : 'text-grey-70'}`}>
        {value || placeholder}
      </span>
      <i className="fa-solid fa-angle-down text-base text-grey-90" aria-hidden />
    </div>
  )
}

interface TextAreaProps {
  value: string
  onChange?: (value: string) => void
}

export function TextArea({ value, onChange }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      className="h-20 w-full resize-none rounded-md border border-[#999999] bg-white p-2 font-body text-sm leading-[21px] tracking-wide text-grey-90 outline-none"
    />
  )
}
