import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { StudentInfo, UserInterface } from '../../../interfaces/userInterface';
import { useThemeContext } from '../../Context/themeContext';
import { GET_AllUsers } from '../../graphql/queries';
import { Button } from '../general/Button';
import { useRouter } from 'next/router';

const TeachersList = (props: { user: UserInterface & StudentInfo }) => {
  const router = useRouter();
  const { darkTheme } = useThemeContext();
  const { data, loading } = useQuery(GET_AllUsers, {
    variables: {
      query: {
        roles: { teacher: true },
      },
    },
  });
  const [users, setUsers] = useState<UserInterface[]>([]);
  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [loading]);
  const RequestJoinTeacher = (teacherID?: string) => {
    if (!props.user) return router.push('/auth/login');
  };
  return (
    <>
      <div className="flex  flex-col gap-5 md:gap-8 mt-4">
        <h1 className="text-2xl md:text-5xl">الشّيوخ</h1>
        <h1 className="text-lg md:text-2xl">
          يمكنك تقديم طلب للتعلم لثلاث شيوخ كحد أقصى
        </h1>
        <div className="flex flex-wrap gap-5 m-auto sm:m-0">
          {loading && <p className="text-3xl">...الرجاء الانتظار</p>}
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
                        text={
                          !props.user.teachers.includes(teacher._id ?? '')
                            ? 'انظمّ الى طلابه'
                            : 'انت بالفعل منظم الى هذا الشيخ'
                        }
                        color={
                          !darkTheme
                            ? 'var(--main-color)'
                            : 'var(--light-color)'
                        }
                        txtColor={
                          darkTheme ? 'var(--main-color)' : 'var(--light-color)'
                        }
                        disable={props.user.teachers.includes(
                          teacher._id ?? ''
                        )}
                        block
                        onClick={() => {
                          RequestJoinTeacher(teacher._id);
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
};

export default TeachersList;
