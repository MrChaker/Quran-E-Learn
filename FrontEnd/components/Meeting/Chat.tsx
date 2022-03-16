import React, {useContext} from 'react'
import { ThemeCentext } from '../../Layouts/layout'
import { Button } from '../Button'
import  {SocketCtxProvider} from './SocketContext'
import { UserInterface } from '../../../BackEnd/Utils/userInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Chat = () => {
  const { joined } = useContext(SocketCtxProvider)
  const {darkTheme} = useContext(ThemeCentext);
  return (
    <div className="absolute h-screen w-1/5 p-8 bg-lightColor dark:bg-darkColor">
      <div  className='flex gap-6 justify-start items-center'>
            <div className="rounded-full border-2 border-green-600 w-8 h-8 ml-1 overflow-hidden">
            </div>
            <p>{ 'chaker' }</p>
            <FontAwesomeIcon icon="microphone" cursor="pointer" />
          </div>
      {
        joined && 
        joined.map((j, i)=>(
          <div key={i} className='flex gap-6 justify-start items-center'>
            <div className="rounded-full border-2 border-green-600 w-8 h-8 ml-1 overflow-hidden">
            </div>
            <p>{ j.user?.name }</p>
            <FontAwesomeIcon icon="microphone" />
          </div>
        )) 
      }
    </div>
  )
}

export default Chat