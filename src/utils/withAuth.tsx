'use client'

import React, { FC, useEffect, JSX } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'

const withAuth = (WrappedComponent: FC) => {
  const Wrapper = (props: JSX.IntrinsicAttributes) => {
    const router = useRouter()
    const { isLoggedIn } = useAuth()

    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/login')
      }
    }, [isLoggedIn, router])

    return isLoggedIn ? <WrappedComponent {...props} /> : null
  }

  return Wrapper
}

export default withAuth
