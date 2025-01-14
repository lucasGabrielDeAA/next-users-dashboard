'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { ContractData } from '@/common/types'

import withAuth from '@/utils/withAuth'

import ContractsTable from '@/components/ContractsTable'

const Page = () => {
  const [contracts, setContracts] = useState<ContractData[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch('http://localhost:3003/contracts')
        const data = await response.json()

        setContracts(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <>
      <div className='page-header'>
        <p>Contracts</p>

        <Link href='/dashboard/contract/new'>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>

      <ContractsTable contracts={contracts} />
    </>
  )
}

export default withAuth(Page)
