import { HashRouter, useRoutes } from 'react-router-dom'
import { routes } from '@/routes'

function AppRoutes() {
  return useRoutes(routes)
}

export function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}
