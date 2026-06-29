import type { RouteObject } from 'react-router-dom'
import { GetReimbursedPage } from '@/pages/GetReimbursedPage'
import { ViewClaimPage } from '@/pages/ViewClaimPage'
import { EditClaimPage } from '@/pages/EditClaimPage'
import { ClaimSubmittedPage } from '@/pages/ClaimSubmittedPage'
import { ViewClaimV2Page } from '@/pages/ViewClaimV2Page'
import { ViewClaimV3Page } from '@/pages/ViewClaimV3Page'
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
    description: 'Upload receipt — empty state, fake extraction flow',
  },
  {
    path: '/view-claim',
    name: 'View claim',
    description: 'Read-only view of a submitted claim with notes panel',
  },
  {
    path: '/edit-claim',
    name: 'Edit claim',
    description: 'Edit a rejected claim — pre-filled form with accordion panels',
  },
  {
    path: '/claim-submitted',
    name: 'Claim submitted',
    description: 'Success confirmation after submitting a claim',
  },
  {
    path: '/view-claim-v2',
    name: 'View claim v2',
    description: 'Duplicate of edit-claim for experimentation',
  },
  {
    path: '/view-claim-v3',
    name: 'View claim v3',
    description: 'Duplicate of view-claim for experimentation',
  },
]

export const routes: RouteObject[] = [
  { path: '/', element: <PrototypeIndex /> },
  { path: '/get-reimbursed', element: <GetReimbursedPage /> },
  { path: '/view-claim', element: <ViewClaimPage /> },
  { path: '/edit-claim', element: <EditClaimPage /> },
  { path: '/claim-submitted', element: <ClaimSubmittedPage /> },
  { path: '/view-claim-v2', element: <ViewClaimV2Page /> },
  { path: '/view-claim-v3', element: <ViewClaimV3Page /> },
]
