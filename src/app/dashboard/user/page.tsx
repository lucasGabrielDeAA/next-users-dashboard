'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { UserData } from '@/common/types'

import withAuth from '@/utils/withAuth'

import UsersTable from '@/components/UsersTable'

const Page = () => {
  const [users, setUsers] = useState<UserData[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch('http://localhost:3003/users')
        const data = await response.json()

        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleDeleteUser = async (id: string | undefined) => {
    try {
      if (confirm('Confirm user deletion?')) {
        await fetch(`http://localhost:3003/users/${id}`, {
          method: 'DELETE',
        })

        setUsers((users) => users?.filter((user) => user.id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='page-header'>
        <p>Users</p>

        <Link href='/dashboard/user/new'>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>

      <UsersTable users={users} handleDeleteUser={handleDeleteUser} />
    </>
  )
}

export default withAuth(Page)
