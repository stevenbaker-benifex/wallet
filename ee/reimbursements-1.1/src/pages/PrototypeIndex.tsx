import { Link } from 'react-router-dom'
import { prototypeRoutes } from '@/routes'

export function PrototypeIndex() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <div className="min-h-full bg-brand-dark-green p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-menu">
        <h1 className="font-heading text-2xl font-semibold text-grey-90">Prototype screens</h1>
        <p className="mt-2 font-body text-base text-grey-70">
          Each screen has its own shareable URL. Copy a link below to send to stakeholders.
        </p>

        <ul className="mt-8 space-y-4">
          {prototypeRoutes.map((route) => {
            const url = `${origin}${route.path}`
            return (
              <li
                key={route.path}
                className="rounded-xl border border-grey-10 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      to={route.path}
                      className="font-heading text-lg font-medium text-grey-90 underline-offset-2 hover:underline"
                    >
                      {route.name}
                    </Link>
                    <p className="mt-1 font-body text-sm text-grey-70">{route.description}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-grey-20 px-4 py-2 font-button text-sm font-semibold text-grey-70 hover:bg-grey-05"
                    onClick={() => navigator.clipboard.writeText(url)}
                  >
                    Copy link
                  </button>
                </div>
                <code className="mt-3 block break-all rounded-lg bg-grey-05 px-3 py-2 font-body text-xs text-grey-70">
                  {url}
                </code>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
