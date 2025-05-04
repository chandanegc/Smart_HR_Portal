import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const BulkSMSLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default BulkSMSLayout
