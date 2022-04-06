import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Request } from '../../../BackEnd/Utils/interfaces/reqInterface';
import { GET_Request } from '../../../FrontEnd/graphql/queries';
import AdminLayout from '../../../FrontEnd/Layouts/adminLayout';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RequestDetails = () => {
  const Router = useRouter();
  const { requestID } = Router.query;

  const { data, loading } = useQuery(GET_Request, {
    variables: {
      _id: requestID,
    },
  });
  const [file, setFile] = useState<File>();
  const [request, setRequest] = useState<Request>();
  useEffect(() => {
    if (data) {
      setRequest(data.getRequest);
    }
    {
      console.log(request);
    }
  }, [loading]);

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
