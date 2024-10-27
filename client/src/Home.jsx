import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to={'/login'}>Login</Link>
      <br />
      <Link to={'/register'}>Register</Link>
      {/* <Link to={'/login'}>Login</Link>
      <Link to={'/login'}>Login</Link> */}
    </div>
  )
}

export default Home