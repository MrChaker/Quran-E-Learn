import { useMutation, useQuery } from '@apollo/client';
import { Router, useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Request } from '../../../interfaces/reqInterface';
import { GET_Request } from '../../../FrontEnd/graphql/queries';
import AdminLayout from '../../../FrontEnd/Layouts/adminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../../FrontEnd/components/general/Button';
import { HANDLE_Request } from '../../../FrontEnd/graphql/mutations';
import Swal from 'sweetalert2';

const RequestDetails = () => {
  const Router = useRouter();
  const { requestID } = Router.query;

  const { data, loading } = useQuery(GET_Request, {
    variables: {
      _id: requestID,
    },
  });
  const [request, setRequest] = useState<Request>();
  useEffect(() => {
    if (data) {
      setRequest(data.getRequest);
    }
    {
      console.log(request);
    }
  }, [loading]);

  const [handleRequest] = useMutation(HANDLE_Request);

  const handlingReq = (id: string, accept: boolean, userID?: string) => {
    Swal.fire({
      icon: 'question',
      text: `${accept ? 'تأكيد الموافقة' : 'تأكيد الرفض'} `,
      confirmButtonText: 'تأكيد',
      confirmButtonColor: '#0e0',
      showDenyButton: true,
      denyButtonText: ' الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        handleRequest({
          variables: {
            _id: id,
            accepted: accept,
            userID,
          },
        });
        Router.back();
      }
    });
  };
  return (
    <div className="flex flex-col gap-12 text-2xl">
      <h1 className="text-5xl">طلب انظمام لطاقم المعلمين</h1>
      <div>
        <p>الاسم {request?.user.name}</p>
        <p>الايميل {request?.user.email}</p>
        <p>رقم الهاتف {request?.user.phone}</p>
      </div>
      <p>
        <a href={request?.cv} target="_blank" className="text-3xl">
          <FontAwesomeIcon icon="download" className="mx-2" />
          {'رابط تحميل الملف المرفق'}
        </a>
      </p>
      <p className="text-2xl border-2 border-darkColor rounded-tl-3xl rounded-br-3xl p-6 min-h-[300px]">
        <h3 className="text-3xl mb-4">الرسالة المرفقة</h3>
        {request?.message}
      </p>
      <div className="flex gap-8">
        <Button
          text="قبول الطلب"
          color="#0e0"
          onClick={() =>
            handlingReq(request?._id || '', true, request?.user._id)
          }
        />
        <Button
          text="رفض الطلب"
          color="red"
          onClick={() => handlingReq(request?._id || '', false)}
        />
      </div>
    </div>
  );
};

RequestDetails.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default RequestDetails;

/* {request?.cv?.includes('application/pdf') ? (
  <div className="w-4/5 h-[600px]">
    
     <object
      data={request.cv}
      type="application/pdf"
      width="100%"
      height="100%"
    ></object> 
  </div>
) : (
  <img src={`${request?.cv}`} alt="req image" />
)} */
