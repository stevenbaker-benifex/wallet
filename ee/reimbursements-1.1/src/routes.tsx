import type { RouteObject } from 'react-router-dom'
import { GetReimbursedPage } from '@/pages/GetReimbursedPage'
import { ViewClaimPage } from '@/pages/ViewClaimPage'
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
    description: '',
  },
  {
    path: '/view-claim',
    name: 'View claim',
    description: '',
  },
]

export const routes: RouteObject[] = [
  { path: '/', element: <PrototypeIndex /> },
  { path: '/get-reimbursed', element: <GetReimbursedPage /> },
  { path: '/view-claim', element: <ViewClaimPage /> },
]
