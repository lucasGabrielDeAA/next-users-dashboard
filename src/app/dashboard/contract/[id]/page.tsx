'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faUser,
  faBuilding,
  faEnvelope,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons'

import { ContractData } from '@/common/types'
import withAuth from '@/utils/withAuth'

const Page = () => {
  const { back } = useRouter()
  const { id } = useParams()
  const [contract, setContract] = useState<ContractData>({
    id: String(id),
    name: '',
    email: '',
    user: undefined,
    price: 0,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/contracts/${id}?_expand=user`
        )
        const data = await response.json()

        setContract(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])

  const handleBackClick = () => back()

  return (
    <>
      <div className='page-header'>
        <p onClick={handleBackClick} className='back-button'>
          <FontAwesomeIcon icon={faAngleLeft} /> Contract {contract.id}
        </p>
      </div>

      <div className='container'>
        <div className='item'>
          <FontAwesomeIcon icon={faBuilding} />

          <span className='large-text'>{contract.name}</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faEnvelope} />

          <span className='large-text'>{contract.email}</span>
        </div>
      </div>

      <div className='container'>
        <div className='item'>
          <FontAwesomeIcon icon={faUser} />

          <span className='large-text'>{`${contract.user?.name}/${contract.user?.email}`}</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faMoneyBill} />

          <span className='large-text'>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(contract.price)}
          </span>
        </div>
      </div>
    </>
  )
}

export default withAuth(Page)
