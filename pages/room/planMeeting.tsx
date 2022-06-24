import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSidePropsContext } from 'next';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { Button } from '../../FrontEnd/components/general/Button';
import { useThemeContext } from '../../FrontEnd/Context/themeContext';
import { getUserProps } from '../../FrontEnd/getUserProps';
import { PLAN_Meeting } from '../../FrontEnd/graphql/mutations';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie, true);
}

const PlanMeeting = ({ ...props }) => {
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
  const dp = useRef<DatePicker>(null!);
  const title = useRef<HTMLInputElement>(null!);
  const mins = useRef<HTMLSelectElement>(null!);
  const hrs = useRef<HTMLSelectElement>(null!);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    planMeeting({
      variables: {
        title: title.current.value,
        teacherID: props.user._id,
        date: selected,
        duration: Number(mins.current.value) + Number(hrs.current.value) * 60,
      },
    });
  };
  const handleDate = (date: Date) => {
    setSelected(date);
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
      <label>مدّة البثّ</label>
      <div className="flex gap-4">
        <select name="minutes" id="mins" value={0} className="input" ref={mins}>
          <option value="15">د15 </option>
          <option value="30">د30 </option>
          <option value="45">د45 </option>
        </select>{' '}
        :
        <select name="hours" id="hours" value={0} className="input" ref={hrs}>
          <option value="1"> ساعة 1</option>
          <option value="2"> ساعة 2</option>
          <option value="3"> ساعة 3</option>
        </select>
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
