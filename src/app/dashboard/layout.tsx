import React, { ReactNode } from 'react'

import Header from '@/components/Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  )
}
