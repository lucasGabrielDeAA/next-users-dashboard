'use client'

import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '@/context/AuthProvider'

const Header = () => {
  const { replace } = useRouter()
  const path = usePathname()

  const { isLoggedIn, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const links = [
    {
      id: 1,
      href: '/dashboard',
      onClick: null,
      name: 'Home',
    },
    {
      id: 2,
      href: '/dashboard/user',
      onClick: null,
      name: 'Users',
    },
    {
      id: 3,
      href: '/dashboard/contract',
      onClick: null,
      name: 'Contracts',
    },
    {
      id: 4,
      href: null,
      onClick: () => handleSignOut(),
      name: 'Logout',
    },
  ]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)')

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => mediaQuery?.removeListener(handleMediaQueryChange)
  }, [])

  const handleMediaQueryChange = (mediaQuery: MediaQueryListEvent) =>
    setIsSmallScreen(mediaQuery.matches)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSignOut = async () => {
    try {
      await signOut()
      replace('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header>
      <div className='header_title'>
        <p>Cockpit</p>
      </div>

      {isLoggedIn && (!isSmallScreen || isMenuOpen) && (
        <nav>
          {links?.map((link) => (
            <div key={link.id}>
              {link.href ? (
                <Link
                  href={link.href}
                  className={path === link.href ? 'active-link' : ''}
                >
                  {link.name}
                </Link>
              ) : (
                link.onClick && (
                  <button onClick={link.onClick}>{link.name}</button>
                )
              )}
            </div>
          ))}
        </nav>
      )}

      {isLoggedIn && (
        <button onClick={toggleMenu} className='burger'>
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
    </header>
  )
}

export default Header
