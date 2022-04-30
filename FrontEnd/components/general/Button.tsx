import { motion } from 'framer-motion';
import { ReactElement } from 'react';

type PropsType = {
  block?: boolean;
  disable?: boolean;
  rounded?: boolean;
  outline?: boolean;
  color: string;
  txtColor?: string;
  size?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  text?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  dir?: 'rtl' | 'ltr' | undefined;
  style?: string;
  onClick?: (prams: any | undefined) => any | void | undefined;
};
export const Button = (props: PropsType) => {
  return (
    <motion.button
      id="btn"
      dir={props.dir || 'ltr'}
      type={props.type}
      disabled={props.disable}
      initial={{ x: '-100vw', opacity: 0 }}
      onClick={props.onClick}
      animate={{ x: 0, opacity: 1 }}
      className={` cursor-pointer p-4 px-8  ${
        props.rounded ? 'rounded-full' : 'rounded-md'
      } justify-center border border-solid ${props.style} ${
        props.block ? 'block w-full' : 'inline-block'
      } `}
      style={{
        color: props.outline ? props.color : props.txtColor,
        backgroundColor: props.outline ? 'transparent' : props.color,
        fontSize: props.size || '1.25rem',
        borderColor: props.color,
      }}
    >
      <p className={`mr-4 inline-block`}>{props.leftIcon}</p>
      {props.text}
      <p className={`ml-4 inline-block`}>{props.rightIcon}</p>
    </motion.button>
  );
};
