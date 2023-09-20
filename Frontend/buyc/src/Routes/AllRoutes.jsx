import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SecondhandCars from '../Pages/SecondhandCars'
import DealersCar from '../Pages/DealersCar'
import Auth from '../Pages/Auth'
import PrivateRoute from './PrivateRoute'

function AllRoutes() {
  return (
    <>
<Routes>
<Route path='/secondhand' element={<PrivateRoute><SecondhandCars/></PrivateRoute>}/>
<Route path='/' element={<PrivateRoute><DealersCar/></PrivateRoute>}/>
<Route path='/Auth' element={<Auth/>}/>

</Routes>
    </>

  )
}

export default AllRoutes