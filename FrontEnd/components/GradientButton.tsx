import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const GradientButton = (props: any) => {
  const { ref, inView } = useInView({
    rootMargin: "-40px",
  });
  return (
    <div ref={ref}>
      <AnimatePresence>
        {inView && (
          <motion.div
            id="btn"
            initial={{ x: "-100vw", opacity: 0 }}
            onClick={props.onClick}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100vw", opacity: 0 }}
            className={` cursor-pointer p-4 px-8  ${
              props.rounded ? "rounded-full" : "rounded-md"
            } justify-center  ${props.block ? "block" : "inline-block"} ${
              props.outline ? " border-2 border-solid border-transparent" : ""
            } bg-clip-border bg-origin-border`}
            style={{
              color: props.outline ? "transparent" : props.txtColor,
              backgroundImage: ` linear-gradient(90deg, ${props.from}, ${props.to}) `,
              fontSize: props.size || "1.25rem",
              boxShadow: `2px 1000px 1px ${props.color} inset`,
            }}
          >
            <p
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: ` linear-gradient(90deg, ${props.from}, ${props.to}) `,
              }}
            >
              {props.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
