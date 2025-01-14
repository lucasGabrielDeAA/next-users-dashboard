'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik, FormikProvider } from 'formik'
import * as Yup from 'yup'

import { useAuth } from '@/context/AuthProvider'

import Header from '@/components/Header'

import { LoginData } from '@/common/types'

const Page = () => {
  const { push } = useRouter()
  const { signIn, isLoggedIn } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please inform a valid email')
        .required('Email is required'),
      password: Yup.string().required('Password is Required'),
    }),
    onSubmit: (values) => handleSignIn(values),
  })

  const handleSignIn = async (values: LoginData) => {
    try {
      await signIn(values)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      push('/dashboard')
    }
  })

  return (
    <>
      <Header />

      <main>
        <FormikProvider value={formik}>
          <div className='form'>
            <p className='form-title'>Welcome to Cockpit</p>

            <form onSubmit={formik.handleSubmit}>
              <input
                id='email'
                placeholder='Email'
                type='text'
                className={
                  formik.touched.email && formik.errors.email
                    ? 'input-error'
                    : ''
                }
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className='error-message'>{formik.errors.email}</div>
              )}

              <input
                id='password'
                placeholder='Password'
                type='password'
                className={
                  formik.touched.password && formik.errors.password
                    ? 'input-error'
                    : ''
                }
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div className='error-message'>{formik.errors.password}</div>
              )}

              <button
                className='form-button'
                type='submit'
                disabled={formik.isSubmitting}
              >
                Login
              </button>
            </form>
          </div>
        </FormikProvider>
      </main>
    </>
  )
}

export default Page
