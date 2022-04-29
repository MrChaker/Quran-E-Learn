import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { dataIsValid } from '../auth/functions';

const QuillEditor = (props: {
  setDataFunc?: React.Dispatch<React.SetStateAction<string>>;
  data: React.MutableRefObject<string>;
}) => {
  const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => (
      <p className="w-full h-full text-center text-5xl">Loading ...</p>
    ),
  });

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: ['serif', 'Roboto'] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      [{ direction: 'rtl' }],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'direction',
    'align',
    'link',
    'image',
    'video',
  ];
  return (
    <div dir="ltr" className="w-full">
      <QuillNoSSRWrapper
        className="w-full"
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={(value) => (props.data.current = value)}
      />
    </div>
  );
};

export default QuillEditor;
