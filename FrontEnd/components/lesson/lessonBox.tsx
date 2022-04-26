import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
const LessonBox = (props: {
  title: string;
  thumbnail: string;
  progress: number;
}) => {
  return (
    <div className=" l min-w-[220px] h-32 w-1/3 md:w-80 md:h-48 ">
      <Link href={`lessons/${props.title}`}>
        <a className="overflow-hidden w-full h-full block rounded-3xl shadow-lg hover:shadow-2x ">
          <motion.div
            initial={{ scale: 1.06 }}
            whileHover={{ scale: 1.2 }}
            transition={{ stiffness: 50 }}
            className="w-full h-full relative"
          >
            <Image
              src={props.thumbnail}
              layout="fill"
              objectFit="contain"
              alt={`${props.title} image`}
            />
          </motion.div>
        </a>
      </Link>
      <div className="flex justify-between text-xl px-4 mt-2">
        <p className="">{props.title}</p>
        <p>{props.progress}%</p>
      </div>
    </div>
  );
};

export default LessonBox;
