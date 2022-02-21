import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../FrontEnd/components/homePage/header'

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <a href='https://pngtree.com/so/al' className="hidden">al png from pngtree.com/</a>
    </>
  )
}

export default Home
