import React, { useState, useEffect } from 'react'
import axios from './config/axios'

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const response = axios.get("user/getUser").then((res) => {
      console.log(res);
      setData(res.data)
    }).catch((err) => {
      console.log(err);
    })
    return response
  }, [])
  return (
    <div>
      {data}
    </div>
  )
}

export default App
