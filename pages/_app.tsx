import '../FrontEnd/styles/globals.css';
import '../FrontEnd/styles/auth.css';
import 'react-quill/dist/quill.snow.css';
import '../FrontEnd/styles/quillEditor.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../FrontEnd/styles/datepicker.css';

import { Layout } from '../FrontEnd/Layouts/layout';
import { fontAW } from '../FrontEnd/fontawsome';
import ApolloProvider from '../FrontEnd/graphql/Apollo';
import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import { AppPropsWithLayout } from '../FrontEnd/Layouts/types';
import { UserContext, User } from '../FrontEnd/Context/userContext';
import Head from 'next/head';
import { crypt, deCrypt } from '../BackEnd/Utils/crypting';
fontAW();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [user, setUser] = useState<User>({
    info: null,
    isAuthenticated: false,
  });

  async function getUser(setter: (value: SetStateAction<User>) => void) {
    const userInfo = await fetchUser();
    setter({
      info: userInfo,
      studentInfo: userInfo
        ? {
            lessons: userInfo.lessons,
            teachers: userInfo.teachers,
          }
        : undefined,
      teacherInfo:
        userInfo && userInfo.roles.teacher
          ? {
              lessons: userInfo.lessons,
              students: userInfo.students,
            }
          : undefined,
      isAuthenticated: userInfo ? true : false,
    });
    localStorage.setItem(
      'currentUser',
      crypt(
        JSON.stringify({
          info: userInfo ? userInfo._id : null,
          isAuthenticated: userInfo ? true : false,
          isTeacher: userInfo?.roles?.teacher,
        }),
        process.env.NEXT_PUBLIC_CRYPT
      )
    );
  }

  useEffect(() => {
    // this is for solving ssr state problem

    setUser(
      JSON.parse(
        deCrypt(
          localStorage.getItem('currentUser') || '',
          process.env.NEXT_PUBLIC_CRYPT
        ) || '{}'
      )
    );
    getUser(setUser);
  }, []);

  // If we define a layout for some pages we get it with  getLayout else we choose the default layout
  const getLayout =
    Component.getLayout ?? ((compenent) => <Layout>{compenent}</Layout>);

  return (
    <>
      <Head>
        <title>Quraani</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserContext.Provider value={{ user, setUser }}>
        <ApolloProvider>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </UserContext.Provider>
    </>
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
