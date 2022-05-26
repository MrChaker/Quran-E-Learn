import { useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UserInterface } from '../../../interfaces/userInterface';
import { useThemeContext } from '../../Context/themeContext';
import { UserContext } from '../../Context/userContext';
import {
  DELETE_User,
  JOIN_Teacher,
  UPDATE_User,
} from '../../graphql/mutations';
import { GET_AllUsers } from '../../graphql/queries';
import { Button } from '../general/Button';

const UserListing = (props: {
  userRole: { student?: boolean; teacher?: boolean };
  forAdmin: boolean;
}) => {
  const { user } = useContext(UserContext);
  const { darkTheme } = useThemeContext();
  const { data, loading } = useQuery(GET_AllUsers, {
    variables: {
      query: {
        roles: props.userRole,
      },
    },
  });
  const [users, setUsers] = useState<UserInterface[]>([]);
  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [loading]);

  // admin dashboard methods
  const [updateUser] = useMutation(UPDATE_User);
  const [deleteUser] = useMutation(DELETE_User);
  const promoteAdmin = (_id?: string) => {
    Swal.fire({
      icon: 'question',
      text: ` تأكيد ترقية المستخدم الى عضو اداري `,
      confirmButtonText: 'تأكيد',
      confirmButtonColor: '#0e0',
      showDenyButton: true,
      denyButtonText: ' الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({
          variables: {
            _id,
            query: {
              roles: {
                admin: true,
              },
            },
          },
        });
        Router.reload();
      }
    });
  };
  const DeleteUser = (_id?: string) => {
    Swal.fire({
      icon: 'question',
      text: ` تأكيد حذف المستخدم `,
      confirmButtonText: 'تأكيد',
      confirmButtonColor: '#0e0',
      showDenyButton: true,
      denyButtonText: ' الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser({
          variables: {
            _id,
          },
        });
        Router.reload();
      }
    });
  };

  // regular users methods
  const [joinTeacher] = useMutation(JOIN_Teacher, {
    onCompleted: () => {
      Swal.fire({
        text: 'تمّ الاتحاق بنجاح ، يمكنك الان الاطلاع على الدروس التي يقدما الشيخ',
        icon: 'success',
      });
    },
    onError: (error) => {
      console.log(error.message);
      switch (error.message) {
        case 'already in':
          Swal.fire({ text: ' أنت بالفعل منظم الى الشيخ', icon: 'error' });
          break;
        case 'max reached':
          Swal.fire({
            text: 'عذرا ، يمكنك الالتحاق بشيخين كحد أقصى',
            icon: 'error',
          });
          break;
        default:
          Swal.fire({ text: 'حدث خطأ ، أعد المحاولة لاحقا', icon: 'error' });
      }
    },
  });
  const JoinTeacher = (teacherID?: string) => {
    joinTeacher({
      variables: { teacherID, studentID: user.info?._id },
    });
  };
  if (props.forAdmin)
    return (
      <>
        <div className="flex flex-col gap-12">
          <h1 className="text-5xl">الطلاب</h1>
          {users.map((st, i) => (
            <div
              className="w-2/3 p-6 bg-darkColor rounded-xl text-lighterColor text-xl flex justify-between items-center"
              key={i}
            >
              <div>
                <p>{st.name}</p>
                <p>{st.email}</p>
                <p>{st.phone}</p>
              </div>
              <div>
                {st.roles?.admin ? (
                  <p className="rounded-sm bg-semiColor p-3 text-lg ">
                    عضو اداري
                  </p>
                ) : (
                  <>
                    <p
                      className="rounded-sm bg-semiColor p-3 text-sm text-center mb-2 cursor-pointer "
                      onClick={() => promoteAdmin(st._id)}
                    >
                      ترقية الى عضو اداري
                    </p>
                    <p
                      className="rounded-sm bg-red-700 p-3 text-sm text-center mt-2 cursor-pointer"
                      onClick={() => DeleteUser(st._id)}
                    >
                      حذف العضو
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  else {
    return (
      <>
        <div className="flex  flex-col gap-5 md:gap-8 mt-4">
          <h1 className="text-2xl md:text-5xl">الشّيوخ</h1>
          <h1 className="text-lg md:text-2xl">
            يمكنك تقديم طلب للتعلم لثلاث شيوخ كحد أقصى
          </h1>
          <div className="flex flex-wrap gap-5 m-auto sm:m-0">
            {users.map((teacher, i) => (
              <>
                {teacher.name !== 'المنصة' && (
                  <Link href={`#`} key={i}>
                    <a className=" shadow-lg hover:shadow-xl rounded-2xl flex gap-3 flex-col items-center  p-8 w-[30%] min-h-[320px] min-w-[250px] ">
                      <div className="rounded-full w-52 h-52 relative overflow-hidden ">
                        <Image
                          src={teacher.image || '/Male.png'}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="border-t border-semiColor w-full text-lg">
                        <p className="text-center">{teacher.name}</p>
                        <p className="text-center">{teacher.phone}</p>
                        <Button
                          text="انظمّ الى طلابه"
                          color={
                            !darkTheme
                              ? 'var(--main-color)'
                              : 'var(--light-color)'
                          }
                          txtColor={
                            darkTheme
                              ? 'var(--main-color)'
                              : 'var(--light-color)'
                          }
                          block
                          onClick={() => {
                            JoinTeacher(teacher._id);
                          }}
                        />
                      </div>
                    </a>
                  </Link>
                )}
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default UserListing;
