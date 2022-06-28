import React, { useState, useEffect } from 'react';
import { Meeting } from '../../../interfaces/meetingInterface';
import { GET_Meetings } from '../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Button } from '../general/Button';
import { CANCEL_Meeting } from '../../graphql/mutations';
import Router from 'next/router';
import Image from 'next/image';

const MeetingsList = (props: {
  forTeacher?: boolean;
  top: number;
  left: number;
  user: any;
}) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { data, loading } = useQuery(GET_Meetings, {
    variables: {
      teachersIDs: props.forTeacher ? [props.user._id] : props.user.teachers,
    },
  });
  useEffect(() => {
    if (data) {
      setMeetings(data.getMeetings);
    }
  }, [loading]);
  const [cancelMeeting] = useMutation(CANCEL_Meeting, {
    onCompleted: () => {
      Router.reload();
    },
  });
  const [meetingsHidden, setMeetingsHidden] = useState(false);
  useEffect(() => {
    if (window) {
      setMeetingsHidden(window.innerWidth < 1025 ? true : false);
      window.addEventListener('resize', () => {
        if (window.innerWidth < 1025 && !meetingsHidden) {
          setMeetingsHidden(true);
        } else if (window.innerWidth >= 1025 && meetingsHidden) {
          setMeetingsHidden(false);
        }
      });
    }
  }, []);
  return (
    <>
      <div
        className="absolute w-12 h-12  bg-lightColor shadow-2xl rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        style={{
          top: props.top,
          left: props.left,
        }}
        onClick={() => {
          setMeetingsHidden((prev) => !prev);
        }}
      >
        <Image src={'/iconly/schedule.png'} width={28} height={28} />
      </div>
      <div
        className="absolute w-64  transition-all"
        style={{
          left: meetingsHidden ? '-165%' : props.left,
          top: props.top + 60,
        }}
      >
        {meetings.map((mt, i) => (
          <div
            className=" shadow-3xl bg-lightColor dark:text-darkColor p-4 mb-6 block border-t-8 border-t-rose-700"
            key={i}
          >
            <p className="text-center text-2xl mb-4">بث مباشر</p>
            <p className="text-center">
              يوم{' '}
              {new Date(Number(mt.date!)).toLocaleDateString('ar-EG', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-center">
              الساعة {new Date(Number(mt.date!)).getHours()}:
              {new Date(Number(mt.date!)).getMinutes()}
              {new Date(Number(mt.date!)).getHours() > 12 ? ' مساءا' : ' صباحا'}
            </p>
            <p className="text-center">{mt.title}</p>
            <p className="text-center">
              مدّة البث
              {` ${Math.round(mt.duration / 60)} ساعة و ${
                mt.duration % 60
              } دقيقة`}{' '}
            </p>
            <p className="text-center">مع الشيخ {mt.teacher?.name}</p>

            <Link href={`/room/${mt.teacher?._id}`}>
              <a>
                <Button
                  text="أدخل الى الغرفة"
                  color="var(--semi-color)"
                  txtColor="white"
                  block
                  style="my-4"
                  disable={new Date(Number(mt.date!)) > new Date()}
                />
              </a>
            </Link>
            {props.forTeacher && (
              <Button
                text="الغاء البث"
                color="#890021"
                txtColor="white"
                block
                onClick={() => {
                  cancelMeeting({
                    variables: {
                      _id: mt._id,
                    },
                  });
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MeetingsList;
