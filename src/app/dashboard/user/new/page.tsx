'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useFormik, FormikProvider } from 'formik'
import * as Yup from 'yup'

import { UserData } from '@/common/types'
import withAuth from '@/utils/withAuth'

const Page = () => {
  const { back } = useRouter()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Please inform a valid email')
        .required('Email is required'),
      role: Yup.string().required('Role is Required'),
    }),
    onSubmit: (values) => handleCreateUser(values),
  })

  const handleCreateUser = async (values: UserData) => {
    try {
      await fetch('http://localhost:3003/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      setTimeout(() => handleBackClick(), 500)
    } catch (error) {
      console.log({ error })
    }
  }

  const handleBackClick = () => back()

  return (
    <FormikProvider value={formik}>
      <div className='page-header'>
        <p onClick={handleBackClick} className='back-button'>
          <FontAwesomeIcon icon={faAngleLeft} /> Create user
        </p>
      </div>

      <div className='form'>
        <form onSubmit={formik.handleSubmit}>
          <input
            id='name'
            placeholder='Name'
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
            placeholder='Email'
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
            id='role'
            placeholder='Role'
            type='text'
            className={
              formik.touched.role && formik.errors.role ? 'input-error' : ''
            }
            {...formik.getFieldProps('role')}
          />
          {formik.touched.role && formik.errors.role && (
            <div className='error-message'>{formik.errors.role}</div>
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
