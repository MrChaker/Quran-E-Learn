import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../Context/userContext';

type PropsType = {
  isOn: boolean;
  left: string;
  top: string;
};
const DropMenu: React.FC<PropsType> = (props) => {
  return (
    <AnimatePresence>
      {props.isOn && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className=" absolute rounded-lg p-4 dark:bg-lightColor bg-darkColor h-36 w-36 opacity-80 flex flex-col items-center justify-between text-lg z-50"
          style={{ left: props.left, top: props.top }}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DropMenuLink = (props: {
  name: string;
  link?: string;
  isButton?: boolean;
  onClick?: () => void;
}) => {
  if (!props.isButton)
    return (
      <Link href={`${props.link}`}>
        <a>
          <p className="text-lightColor dark:text-darkColor hover:text-semiColor hover:dark:text-semiColor">
            {props.name}
          </p>
        </a>
      </Link>
    );
  return (
    <div
      className="bg-lightColor text-sm dark:bg-darkColor rounded-lg p-2  h-fit cursor-pointer"
      onClick={props.onClick}
    >
      {props.name}
    </div>
  );
};
export default DropMenu;
