import React, { useState } from 'react';

type PropsType = {
  navElements: {
    title: String;
    content: JSX.Element;
  }[];
};
const TabelNavigation = (props: PropsType) => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(-1);

  const [content, setContent] = useState(props.navElements[0].content);

  const handleNavChange = (index: number) => {
    setActive(index);
    setContent(props.navElements[index].content);
  };
  return (
    <div className="p-4 w-full">
      <ul className="flex list-none gap-1 sm:gap-5">
        {props.navElements.map((el, i) => (
          <li
            key={i}
            onClick={() => {
              handleNavChange(i);
            }}
            className={`cursor-pointer p-4 text-sm  sm:text-2xl sm:min-w-[100px] text-center rounded-lg ${
              active == i || hovered == i
                ? 'bg-darkColor dark:bg-lightColor text-lightColor dark:text-darkColor  '
                : ''
            }`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
          >
            {el.title}
          </li>
        ))}
      </ul>
      <div className="content py-8 ">{content}</div>
    </div>
  );
};

/* const NavEl = (props: { name: String; content: React.FC }) => {
  return <div></div>;
}; */
export default TabelNavigation;
