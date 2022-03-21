
import Image from "next/image";
import { useThemeContext } from "../../Context/themeContext";
import { useContext } from "react";
import { Button } from "../Button";
import Link from "next/link";
export const Header = () => {
  const { darkTheme } = useThemeContext();
  return (
    <>
      <div
        className={` flex flex-col-reverse items-center   justify-between gap-10 md:flex-row`}
      >
        <div className="min-w-[320px] lg:min-w-[400px] text-center text-4xl sm:text-5xl text-darkColor dark:text-lightColor md:text-right lg:text-6xl  ">
          <h1 className=" w-fit m-auto md:w-full md:m-0  flex items-center font-bold whitespace-nowrap">
            قال رسول الله
            <h1>ﷺ</h1>
          </h1>
          <p className="my-7 text-3xl sm:text-4xl lg:text-5xl font-quran">
            "خيركم من تعلّم القرآن و علّمه"
          </p>
          <Link href="/auth/signup">
            <a><Button
              color={darkTheme ? "var(--light-color)" : `var(--main-color)`}
              txtColor={darkTheme ? `var(--main-color)` : "var(--light-color)"}
              text="انظمّ الى البرنامج"
              size="1.4rem"
              rounded
              dir="ltr"
            /></a>
          </Link>
        </div>

        <div className={`relative -mb-5 sm:mb-0`}>
          <div className="relative min-h-[350px] min-w-[280px] lg:min-h-[470px] lg:min-w-[350px]">
            <Image src="/quran.png" alt="me" width={450} height={470} />
          </div>
        </div>
      </div>
    </>
  );
};
