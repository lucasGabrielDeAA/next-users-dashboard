'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faMoneyBill1Wave,
  faPaperclip,
  faCode,
} from '@fortawesome/free-solid-svg-icons'

import withAuth from '@/utils/withAuth'

const Page = () => {
  return (
    <>
      <div className='page-header'>
        <p>Dashboard</p>
      </div>

      <div className='title'>
        <p>Loren Ipsum</p>
      </div>

      <div className='container'>
        <div className='item'>
          <FontAwesomeIcon icon={faUser} />

          <span className='large-text'>55</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faPaperclip} />

          <span className='large-text'>2000</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faCode} />

          <span className='large-text'>129</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faMoneyBill1Wave} />

          <span className='large-text'>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }).format(5500.0)}
          </span>
        </div>
      </div>

      <div className='title'>
        <p>Loren Ipsum</p>
      </div>

      <div className='container'>
        <div className='item'>
          <FontAwesomeIcon icon={faUser} />

          <span className='large-text'>55</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faPaperclip} />

          <span className='large-text'>2000</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faCode} />

          <span className='large-text'>129</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faMoneyBill1Wave} />

          <span className='large-text'>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(5500.0)}
          </span>
        </div>
      </div>

      <div className='title'>
        <p>Loren Ipsum</p>
      </div>

      <div className='container'>
        <div className='item'>
          <FontAwesomeIcon icon={faUser} />

          <span className='large-text'>55</span>
        </div>
      </div>

      <div className='title'>
        <p>Loren Ipsum</p>
      </div>

      <div className='container'>
        <div className='item'>
          <FontAwesomeIcon icon={faPaperclip} />

          <span className='large-text'>2000</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faCode} />

          <span className='large-text'>129</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faMoneyBill1Wave} />

          <span className='large-text'>
            {new Intl.NumberFormat('en', {
              style: 'currency',
              currency: 'USD',
            }).format(5500.0)}
          </span>
        </div>
      </div>

      <div className='title'>
        <p>Loren Ipsum</p>
      </div>

      <div className='container'>
        <div className='item'>
          <FontAwesomeIcon icon={faUser} />

          <span className='large-text'>55</span>
        </div>
        <div className='item'>
          <FontAwesomeIcon icon={faPaperclip} />

          <span className='large-text'>2000</span>
        </div>
      </div>
    </>
  )
}

export default withAuth(Page)
