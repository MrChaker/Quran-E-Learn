import { useQuery } from '@apollo/client';
import {useRouter} from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { Request } from '../../../BackEnd/Utils/interfaces/reqInterface';
import { GET_Request } from '../../../FrontEnd/graphql/queries';
import AdminLayout from '../../../FrontEnd/Layouts/adminLayout';
import Image from 'next/image';

const RequestDetails = () => {
  const Router = useRouter();
  const {requestID} = Router.query

  const {data, loading} = useQuery(GET_Request,{
    variables:{
      _id: requestID
    }
  })
  const [ file, setFile ] = useState<File>();
  const [ request, setRequest ] = useState<Request>();
  useEffect(()=>{
    if(data){
      setRequest(data.getRequest);
    }
    {console.log(request?.cv)}

  }, [loading])

  return (
    <div className='flex flex-col gap-12'>
      <h1 className="text-5xl">طلب {request?.user.name}</h1>
      {/* <img src={`/${request?.cv?.data}`} alt='cv'
      /> */}
      {request?.message}
    </div>
  )
}


RequestDetails.getLayout = function getLayout(page: ReactElement ) {
  return(
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
export default RequestDetails