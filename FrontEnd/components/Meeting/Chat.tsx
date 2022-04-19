import React, { useContext } from 'react';
import { useThemeContext } from '../../Context/themeContext';
import { Button } from '../general/Button';
import { SocketCtxProvider } from '../../Context/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chat = () => {
  const { joined } = useContext(SocketCtxProvider);
  const { darkTheme } = useThemeContext();
  return (
    <div className="absolute h-screen w-1/5 p-8 right-0 bg-lightColor dark:bg-darkColor -mt-8">
      <div className="flex gap-6 justify-start items-center">
        <div className="rounded-full border-2 border-green-600 w-8 h-8 ml-1 overflow-hidden"></div>
        <p>{'chaker'}</p>
        <FontAwesomeIcon icon="microphone" cursor="pointer" />
      </div>
      {joined &&
        joined.map((j, i) => (
          <div key={i} className="flex gap-6 justify-start items-center">
            <div className="rounded-full border-2 border-green-600 w-8 h-8 ml-1 overflow-hidden"></div>
            <p>{j.user?.name}</p>
            <FontAwesomeIcon icon="microphone" />
          </div>
        ))}
    </div>
  );
};

export default Chat;
