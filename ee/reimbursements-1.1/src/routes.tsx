import type { RouteObject } from 'react-router-dom'
import { GetReimbursedPage } from '@/pages/GetReimbursedPage'
import { PrototypeIndex } from '@/pages/PrototypeIndex'

export interface PrototypeRoute {
  path: string
  name: string
  description: string
}

export const prototypeRoutes: PrototypeRoute[] = [
  {
    path: '/get-reimbursed',
    name: 'Get reimbursed',
    description: 'Upload receipt empty state — Figma starting screen',
  },
]

export const routes: RouteObject[] = [
  { path: '/', element: <PrototypeIndex /> },
  { path: '/get-reimbursed', element: <GetReimbursedPage /> },
]
