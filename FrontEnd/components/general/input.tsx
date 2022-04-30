import React, { useRef } from 'react';

const FileInput = (props: {
  text?: string;
  onChange?: () => void;
  name: string;
}) => {
  const ref = useRef<HTMLInputElement>(null!);
  return (
    <div className="relative">
      <p
        onClick={() => ref.current.click()}
        className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
      >
        {props.text}
      </p>
      <input
        type="file"
        className="file:w-64 file:text-transparent file:p-4  file:cursor-pointer file:rounded-lg my-8 file:bg-transparent file:border-2 file:border-lightColor file:outline-none w-full h-full"
        name={props.name}
        ref={ref}
        onChange={props.onChange}
      />
    </div>
  );
};

export default FileInput;
