import { motion } from "framer-motion";

export const Button = (props: any) => {
  return (
    <motion.div
      id="btn"
      initial={{ x: "-100vw", opacity: 0 }}
      onClick={props.onClick}
      animate={{ x: 0, opacity: 1 }}
      className={` cursor-pointer p-4 px-8  ${
        props.rounded ? "rounded-full" : "rounded-md"
      } justify-center border border-solid ${props.style} ${
        props.block ? "block" : "inline-block"
      } `}
      style={{
        color: props.outline ? props.color : props.txtColor,
        backgroundColor: props.outline ? "transparent" : props.color,
        fontSize: props.size || "1.25rem",
        borderColor: props.color,
      }}
    >
      <p className={`mr-4 inline-block`}>{props.leftIcon}</p>
      {props.text}
      <p className={`ml-4 inline-block`}>{props.rightIcon}</p>
    </motion.div>
  );
};
