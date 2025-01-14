'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
import { ContractData, ContractsTableProps } from '@/common/types'

const UsersTable = ({ contracts }: ContractsTableProps) => {
  return (
    <div className='table-container'>
      {contracts?.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company name</th>
              <th>Contact</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {contracts?.map((contract: ContractData) => (
              <tr key={contract.id}>
                <td>{contract.id}</td>
                <td>
                  <span className='cell-header'>Name</span> {contract.name}
                </td>
                <td>
                  <span className='cell-header'>Email</span> {contract.email}
                </td>
                <td>
                  <span className='cell-header'>Price</span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(contract.price)}
                </td>
                <td>
                  <span className='cell-header' />
                  <Link href={`/dashboard/contract/${contract.id}`}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='empty-table-title'>
          There are no contracts yet, please create some to display it on this
          page
        </p>
      )}
    </div>
  )
}

export default UsersTable
