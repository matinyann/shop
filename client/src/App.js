import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cancel from './pages/Cancel'
import Success from './pages/Success'

const App = () => {
  const [phones, setPhones] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/phones').then(res => setPhones(res.data))
  }, [])

  const handleBuy = (id) => {
    axios.post(`http://localhost:5000/phones/buy/${id}`).then(res => window.location = res.data.url)
  }

  const MapPhones = () => {
    return phones?.map(phone => (
      <div key={phone._id} className='w-64 flex flex-col justify-between border p-4 m-4 rounded-md'>
        <div className='w-52 h-full flex items-center'>
          <img className='w-full object-cover object-center' src={phone.image} />
        </div>

        <div className='w-full flex flex-col justify-between'>
          <div>
            <h1 className='text-2xl'>{phone.name}</h1>
            <p className='text-xl'>{phone.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} դր.</p>
          </div>
          <button onClick={() => handleBuy(phone._id)} className='p-4 mt-5 bg-green-500 text-xl text-white font-medium rounded-md'>Buy</button>
        </div>
      </div>
    ))
  }

  return (
    <>
      <div className='h-16 flex justify-center items-center bg-green-500'>
        <h1 className='font-semibold text-3xl text-center text-white'>Mobile Shop</h1>
      </div>

      <div className='flex justify-center p-4 flex-wrap'>
        <Routes>
          <Route path='/' element={<MapPhones />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </div>
    </>
  )
}

export default App