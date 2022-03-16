import { useEffect, useState } from 'react'
import Router from 'next/router'
import { UserInterface } from '../BackEnd/Utils/userInterface'

const useIsAuth = () => {
  useEffect(()=>{
     const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if ( !storedUser.isAuthenticated ) Router.push('/auth/login');
  },[])
}

export default useIsAuth