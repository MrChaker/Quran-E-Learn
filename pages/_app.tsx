import '../styles/globals.css'
import '../styles/auth.css'
import type { AppProps } from 'next/app'
import { Layout } from '../FrontEnd/Layouts/layout'
import { fontAW } from "../FrontEnd/fontawsome"
import ApolloProvider from "../FrontEnd/graphql/Apollo"
import { useState, useEffect, createContext } from "react"
import axios from 'axios'
import type { UserInterface } from "../BackEnd/Utils/userInterface"
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
      setUser({info: userInfo, isAuthenticated: userInfo ? true : false })
    }
    getUser();
  }, [])
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
