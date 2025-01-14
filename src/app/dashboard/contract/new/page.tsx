'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useFormik, FormikProvider } from 'formik'
import * as Yup from 'yup'

import withAuth from '@/utils/withAuth'

import { ContractFormData, UserData } from '@/common/types'

const Page = () => {
  const { back } = useRouter()

  const [users, setUsers] = useState<UserData[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/users')
        const data: UserData[] = await response.json()

        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const handleCreateContract = async (values: ContractFormData) => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        userId: values.userId,
        price: Number(parseFloat(values.price).toFixed(2)),
      }

      await fetch('http://localhost:3003/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      setTimeout(() => handleBackClick(), 500)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      price: '',
      userId: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Please inform a valid email')
        .required('Email is required'),
      price: Yup.string().required('Price is required'),
      userId: Yup.string().required('User is required'),
    }),
    onSubmit: (values) => handleCreateContract(values),
  })

  const handleBackClick = () => back()

  return (
    <FormikProvider value={formik}>
      <div className='page-header'>
        <p onClick={handleBackClick} className='back-button'>
          <FontAwesomeIcon icon={faAngleLeft} /> Create contract
        </p>
      </div>

      <div className='form'>
        <form onSubmit={formik.handleSubmit}>
          <input
            id='name'
            placeholder='Company name'
            type='text'
            className={
              formik.touched.name && formik.errors.name ? 'input-error' : ''
            }
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='error-message'>{formik.errors.name}</div>
          )}

          <input
            id='email'
            placeholder='Contact email'
            type='text'
            className={
              formik.touched.email && formik.errors.email ? 'input-error' : ''
            }
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='error-message'>{formik.errors.email}</div>
          )}

          <input
            id='price'
            placeholder='Contract price'
            type='text'
            pattern='^((\d+)|(\d{1,3})(\,\d{3}|)*)(\.\d{2}|)$'
            className={
              formik.touched.price && formik.errors.price ? 'input-error' : ''
            }
            {...formik.getFieldProps('price')}
          />
          {formik.touched.price && formik.errors.price && (
            <div className='error-message'>{formik.errors.price}</div>
          )}

          <select
            id='userId'
            className={
              formik.touched.userId && formik.errors.userId ? 'input-error' : ''
            }
            {...formik.getFieldProps('userId')}
            defaultValue=''
          >
            <>
              <option value='' disabled selected>
                Developer
              </option>

              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </>
          </select>
          {formik.touched.userId && formik.errors.userId && (
            <div className='error-message'>{formik.errors.userId}</div>
          )}

          <button
            className='form-button'
            type='submit'
            disabled={formik.isSubmitting}
          >
            Save
          </button>
        </form>
      </div>
    </FormikProvider>
  )
}

export default withAuth(Page)
