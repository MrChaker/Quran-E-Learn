import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <div className="  bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text  text-3xl text-transparent sm:text-5xl font-quran ">
      <Link href="/">
        <a>القرآن</a>
      </Link>
    </div>
  );
};

export default Logo;
