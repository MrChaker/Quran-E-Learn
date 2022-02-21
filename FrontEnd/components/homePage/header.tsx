import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ThemeCentext } from "../../Layouts/layout";
import { useContext } from "react";
import { Button } from "../Button";
import Link from "next/link";
export const Header = () => {
  const { darkTheme } = useContext(ThemeCentext);
  return (
    <>
      <div
        className={` flex flex-col-reverse items-center   justify-between gap-10 md:flex-row`}
      >
        <div className="min-w-[320px] lg:min-w-[400px] text-center text-4xl sm:text-5xl text-slate-900 dark:text-slate-200 md:text-right lg:text-6xl  ">
          <h1 className=" w-fit m-auto md:w-full md:m-0  flex items-center font-bold whitespace-nowrap">
            قال رسول الله
            <h1>ﷺ</h1>
          </h1>
          <p className="my-7 text-3xl sm:text-4xl lg:text-5xl font-quran">
            "خيركم من تعلّم القرآن و علّمه"
          </p>
          <Link href="/auth/signup">
            <a><Button
              color={darkTheme ? "#e2e8f0" : `#0f172a`}
              txtColor={darkTheme ? `#0f172a` : "#e2e8f0"}
              text="انظمّ الى البرنامج"
              size="1.4rem"
              rounded
              dir="ltr"
            /></a>
          </Link>
        </div>

        <div className={`relative`}>
          <div className="relative min-h-[350px] min-w-[280px] lg:min-h-[470px] lg:min-w-[350px]">
            <Image src="/quran.png" alt="me" width={450} height={470} />
          </div>
        </div>
      </div>
    </>
  );
};
