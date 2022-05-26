import { NextPage } from 'next';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
const PlanMeeting: NextPage = () => {
  const [selected, setSelected] = useState<Date | null>(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-6 text-xl md:text-3xl flex flex-col gap-5"
    >
      <h1 className="text-3xl md:text-5xl">تحضير البث المباشر</h1>
      <label>عنوان البث</label>
      <input type="text" name="title" className="input " />
      <label>تحديد وقت بدأ البثّ</label>
      <div className="flex w-1/4">
        <DatePicker
          selected={selected}
          onChange={(date: Date) => setSelected(date)}
          showTimeSelect
        />
      </div>
    </form>
  );
};

export default PlanMeeting;
