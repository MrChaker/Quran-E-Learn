import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UserInterface } from '../../../BackEnd/Utils/interfaces/userInterface';
import { DELETE_User, UPDATE_User } from '../../graphql/mutations';
import { GET_AllUsers } from '../../graphql/queries';

const UserListing = (props: {
  userRole: { student?: boolean; teacher?: boolean };
  forAdmin: boolean;
}) => {
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
            {props.forAdmin && (
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
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserListing;
