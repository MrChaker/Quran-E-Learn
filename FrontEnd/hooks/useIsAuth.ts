import { useEffect, useState } from 'react'
import Router from 'next/router'

const useIsAuth = (onlyAdmin?: { onlyAdmin: Boolean }) => {
  useEffect(()=>{
     const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if ( !storedUser.isAuthenticated ) Router.push('/auth/login'); 
    if ( onlyAdmin?.onlyAdmin && !storedUser.info.roles.admin ){
      Router.push('/')
    }
  },[])
}

export default useIsAuth