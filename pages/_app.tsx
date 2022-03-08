import '../styles/globals.css'
import '../styles/auth.css'
import type { AppProps } from 'next/app'
import { Layout } from '../FrontEnd/Layouts/layout'
import { fontAW } from "../FrontEnd/fontawsome"
import ApolloProvider from "../FrontEnd/graphql/Apollo"
import { useState, useEffect, createContext, useLayoutEffect } from "react"
import axios from 'axios'
import type { UserInterface } from "../BackEnd/Utils/userInterface"
import  Router  from 'next/router'
import { NextPage } from 'next'
fontAW();
type User = {
  info: UserInterface | null ,
  isAuthenticated: boolean,
}

type UserInt = {
  user: User,
  setUser: (user: User) => void
}

const userInterface: User = {
  info : null,
  isAuthenticated: false
}
export const UserContext = createContext<UserInt>({
  user: userInterface,
  setUser: () => userInterface
});

function MyApp({ Component, pageProps }: AppProps) {
  
  const [ user, setUser ] = useState(userInterface);
  useEffect(()=>{
    // this is for solving ssr state problem
    setUser(JSON.parse(localStorage.getItem('currentUser') || '{}'))
  },[])
  const fetchUser = async () => {
    try{
      const res = await axios.get('/auth/user', { withCredentials: true} );
      return res.data
    }catch(err){
      console.log(err);
      return null
    }
  }
  useEffect(() => {
    const getUser = async () =>{
      const userInfo = await fetchUser();
      console.log(userInfo)
      setUser({info: userInfo, isAuthenticated: userInfo ? true : false });
      localStorage.setItem("currentUser", JSON.stringify({info: userInfo, isAuthenticated: userInfo ? true : false }))
    }
    getUser();
  }, []);

  /* const [ ChosenLayout, setChosenLayout ] = useState<NextPage>(Layout)
  useLayoutEffect(()=>{
    const url = Router.pathname;
    if ( url.includes("/Meeting")) setChosenLayout(Layout)
    else if ( url.includes("/admin")) setChosenLayout(Layout)
    else if ( url.includes("/dashboard")) setChosenLayout(Layout)
  }, []) */

  return (
    <UserContext.Provider value = {{ user, setUser }}>
      <ApolloProvider >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserContext.Provider>
  )
}

export default MyApp
