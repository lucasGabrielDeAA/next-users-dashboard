import { PHASE_DEVELOPMENT_SERVER } from 'next/dist/shared/lib/constants'

module.exports = (phase: string) => {
  return (
    phase !== PHASE_DEVELOPMENT_SERVER && {
      pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    }
  )
}
