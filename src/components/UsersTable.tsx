import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
import { UserData, UsersTableProps } from '@/common/types'

const UsersTable = ({ users, handleDeleteUser }: UsersTableProps) => {
  return (
    <div className='table-container'>
      {users?.length ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user: UserData) => (
              <tr key={user.id}>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </td>
                <td>
                  <span className='cell-header'>ID</span> {user.id}
                </td>
                <td>
                  <span className='cell-header'>Name</span> {user.name}
                </td>
                <td>
                  <span className='cell-header'>Email</span> {user.email}
                </td>
                <td>
                  <span className='cell-header'>Role</span> {user.role}
                </td>
                <td>
                  <span className='cell-header' />
                  <Link href={`/dashboard/user/${user.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='empty-table-title'>
          There are no users yet, please create some to display it on this page
        </p>
      )}
    </div>
  )
}

export default UsersTable
