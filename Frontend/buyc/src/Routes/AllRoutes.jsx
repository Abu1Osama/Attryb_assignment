import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SecondhandCars from '../Pages/SecondhandCars'
import DealersCar from '../Pages/DealersCar'
import Auth from '../Pages/Auth'

function AllRoutes() {
  return (
    <>
<Routes>
<Route path='/' element={<SecondhandCars/>}/>
<Route path='/dealerscar' element={<DealersCar/>}/>
<Route path='/Auth' element={<Auth/>}/>

</Routes>
    </>

  )
}

export default AllRoutes