import type { RouteObject } from 'react-router-dom'
import { GetReimbursedPage } from '@/pages/GetReimbursedPage'
import { ViewClaimPage } from '@/pages/ViewClaimPage'
import { EditClaimPage } from '@/pages/EditClaimPage'
import { ClaimSubmittedPage } from '@/pages/ClaimSubmittedPage'
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
    description: 'Upload receipt — manual extraction flow',
  },
  {
    path: '/view-claim',
    name: 'View claim',
    description: 'Read-only view of a submitted claim with notes panel',
  },
  {
    path: '/claim-submitted',
    name: 'Claim submitted',
    description: 'Success confirmation after submitting a claim',
  },
  {
    path: '/edit-claim',
    name: 'Edit claim (later)',
    description: 'Edit a rejected claim — pre-filled form with accordion panels',
  },
]

export const routes: RouteObject[] = [
  { path: '/', element: <PrototypeIndex /> },
  { path: '/get-reimbursed', element: <GetReimbursedPage /> },
  { path: '/view-claim', element: <ViewClaimPage /> },
  { path: '/edit-claim', element: <EditClaimPage /> },
  { path: '/claim-submitted', element: <ClaimSubmittedPage /> },
]
