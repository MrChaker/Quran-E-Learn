import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
const LessonBox = (props: {
  title: string;
  thumbnail: string;
  progress?: number;
}) => {
  return (
    <>
      <Link href={`lessons/${props.title}/1`}>
        <a className="overflow-hidden w-full h-full block rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-light">
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
        {props.progress != undefined && <p>{props.progress}%</p>}
      </div>
    </>
  );
};

export default LessonBox;
