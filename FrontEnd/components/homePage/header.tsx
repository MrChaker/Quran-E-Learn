import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ThemeCentext } from "../../Layouts/layout";
import { useContext } from "react";
import { Button } from "../Button";
export const Header = () => {
  const { darkTheme } = useContext(ThemeCentext);
  return (
    <>
      <div
        className={` flex flex-col-reverse items-center   justify-between gap-10 md:flex-row`}
      >
        <div className="max-w-md text-center text-3xl text-slate-900 dark:text-slate-200 md:text-left lg:text-5xl ">
          <h1>Hello 👋, I&apos;m Chaker</h1>
          <p className="my-7 text-xl lg:text-3xl">
            Web developer , trying to find meaning in life after achieving 0.1%
            of life goals{" "}
          </p>
          <Button
            color={darkTheme ? "#e2e8f0" : `#0f172a`}
            txtColor={darkTheme ? `#0f172a` : "#e2e8f0"}
            text="Contact me"
            size="1.5rem"
            leftIcon={<FontAwesomeIcon icon="envelope" />}
            rounded
          />
        </div>

        <div className={`relative`}>
          <div className="relative min-h-[350px] min-w-[320px] lg:min-h-[470px] lg:min-w-[400px]">
            <Image src="/Saly-20.png" alt="me" width={450} height={470} />
          </div>
        </div>
      </div>
    </>
  );
};
