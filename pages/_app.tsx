import '../FrontEnd/styles/globals.css';
import '../FrontEnd/styles/auth.css';
import 'react-quill/dist/quill.snow.css';
import '../FrontEnd/styles/quillEditor.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../FrontEnd/styles/datepicker.css';

import App from 'next/app';
import { Layout } from '../FrontEnd/Layouts/layout';
import { fontAW } from '../FrontEnd/fontawsome';
import ApolloProvider from '../FrontEnd/graphql/Apollo';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import axios from 'axios';
import { AppPropsWithLayout } from '../FrontEnd/Layouts/types';
import { UserContext, User } from '../FrontEnd/Context/userContext';
import Head from 'next/head';
import { crypt, deCrypt } from '../BackEnd/Utils/crypting';
import {
  StudentInfo,
  TeacherInfo,
  UserInterface,
} from '../interfaces/userInterface';
fontAW();

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  let user;
  if (appContext.ctx.req) {
    user = await fetchUserServer(appContext.ctx.req.headers.cookie);
    console.log(user);
  } else {
    user = fetchUserClient();
  }
  appProps.pageProps.user = user;
  return {
    ...appProps,
  };
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [userCtx, setUserCtx] = useState<User>(null);

  async function setUserInStorage(setter: Dispatch<SetStateAction<User>>) {
    console.log(fetchUserClient());
    if (!fetchUserClient()) {
      // if not already in
      const userInfo = await fetchUserServer('');
      setter(userInfo);
      localStorage.setItem(
        'currentUser',
        userInfo
          ? crypt(JSON.stringify(userInfo), process.env.NEXT_PUBLIC_CRYPT)
          : ''
      );
    }
  }

  useEffect(() => {
    // this is for solving ssr state problem
    setUserInStorage(setUserCtx);
  }, []);

  // If we define a layout for some pages we get it with  getLayout else we choose the default layout
  const getLayout =
    Component.getLayout ?? ((compenent) => <Layout>{compenent}</Layout>);

  return (
    <>
      <UserContext.Provider value={{ user: userCtx }}>
        <Head>
          <title>Quraani</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <ApolloProvider>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </UserContext.Provider>
    </>
  );
}

const fetchUserServer = async (
  cookie: string
): Promise<(UserInterface & TeacherInfo & StudentInfo) | null> => {
  try {
    const ReqOptions = cookie
      ? {
          withCredentials: true,
          headers: { cookie },
        }
      : {
          withCredentials: true,
        };
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/auth/user`,
      ReqOptions
    );
    return res.data;
  } catch (err) {
    console.log('error');
    return null;
  }
};
export const fetchUserClient = () => {
  let user = localStorage.getItem('currentUser');
  return user
    ? JSON.parse(
        deCrypt(
          localStorage.getItem('currentUser') || '',
          process.env.NEXT_PUBLIC_CRYPT
        ) || '{}'
      )
    : null;
};
export default MyApp;
