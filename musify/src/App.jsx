import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { MyMap } from './Routes/Map'
import AuthContex from './Context/AuthContex'

export const App = () => {
  return (
    <AuthContex>
      {/* inside the paired are all children of AuthContex component such that these children are accessed by keyword children */}
      <RouterProvider router={MyMap}/> 
    </AuthContex>
  )
}
