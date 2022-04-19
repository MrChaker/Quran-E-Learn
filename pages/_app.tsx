import '../FrontEnd/styles/globals.css';
import '../FrontEnd/styles/auth.css';
import { Layout } from '../FrontEnd/Layouts/layout';
import { fontAW } from '../FrontEnd/fontawsome';
import ApolloProvider from '../FrontEnd/graphql/Apollo';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import type { UserInterface } from '../BackEnd/Utils/interfaces/userInterface';
import { AppPropsWithLayout } from '../FrontEnd/Layouts/types';
import { UserContext } from '../FrontEnd/Context/userContext';
fontAW();
type User = {
  info: UserInterface | null;
  isAuthenticated: boolean;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [user, setUser] = useState<User>({
    info: null,
    isAuthenticated: false,
  });

  const getUser = async () => {
    const userInfo = await fetchUser();
    setUser({ info: userInfo, isAuthenticated: userInfo ? true : false });
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        info: userInfo ? userInfo._id : null,
        isAuthenticated: userInfo ? true : false,
      })
    );
  };

  useEffect(() => {
    // this is for solving ssr state problem
    setUser(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    getUser();
  }, []);

  // If we define a layout for some pages we get it with  getLayout else we choose the default layout
  const getLayout =
    Component.getLayout ?? ((compenent) => <Layout>{compenent}</Layout>);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ApolloProvider>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
    </UserContext.Provider>
  );
}

const fetchUser = async () => {
  try {
    const res = await axios.get('/auth/user', { withCredentials: true });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default MyApp;
