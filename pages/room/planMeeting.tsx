import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import React, { useContext, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { Button } from '../../FrontEnd/components/general/Button';
import { useThemeContext } from '../../FrontEnd/Context/themeContext';
import { UserContext } from '../../FrontEnd/Context/userContext';
import { PLAN_Meeting } from '../../FrontEnd/graphql/mutations';
const PlanMeeting: NextPage = () => {
  const [selected, setSelected] = useState<Date | null>(new Date());
  const [planMeeting] = useMutation(PLAN_Meeting, {
    onCompleted: () => {
      Swal.fire({
        text: 'تمت العملية بنجاح ، سنعلم طلابك بهذا البث',
        icon: 'success',
      });
    },
    onError: () => {
      Swal.fire({
        text: ' فشلت العملية',
        icon: 'error',
      });
    },
  });
  const { user } = useContext(UserContext);
  const dp = useRef<DatePicker>(null!);
  const title = useRef<HTMLInputElement>(null!);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    planMeeting({
      variables: {
        title: title.current.value,
        teacherID: user.info?._id,
        date: selected,
      },
    });
  };
  const handleDate = (date: Date) => {
    setSelected(date);
    console.log(date);
  };
  const { darkTheme } = useThemeContext();
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-6 text-xl md:text-3xl flex flex-col gap-5 w-full sm:w-2/3 m-auto"
    >
      <h1 className="text-3xl md:text-5xl mb-4">تحضير البث المباشر</h1>
      <label>عنوان البث</label>
      <input type="text" name="title" ref={title} className="input mb-4" />
      <label>تحديد وقت بدأ البثّ</label>
      <div className="flex w-1/4 gap-4 cursor-pointer items-center mb-10">
        <FontAwesomeIcon
          icon="calendar"
          onClick={() => dp.current.setOpen(true)}
        />
        <DatePicker
          selected={selected}
          onChange={(date: Date) => handleDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="cursor-pointer input"
          ref={dp}
        />
      </div>
      <Button
        text="حفظ"
        color={!darkTheme ? 'var(--main-color)' : 'var(--light-color)'}
        txtColor={darkTheme ? 'var(--main-color)' : 'var(--light-color)'}
        block
        type="submit"
      />
    </form>
  );
};

export default PlanMeeting;
