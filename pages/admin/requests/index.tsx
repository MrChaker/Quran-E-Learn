import React, { ReactElement, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_Requests } from '../../../FrontEnd/graphql/queries'
import Link from 'next/link';
import { Request } from '../../../BackEnd/Utils/interfaces/reqInterface';
import AdminLayout from '../../../FrontEnd/Layouts/adminLayout';

const Requests = () => {
  const { data, loading} = useQuery(GET_Requests);
  const [ requests, setRequests ] = useState<Request[]>([]);
  useEffect(()=>{
    if(data){
      setRequests(data.getRequests)
    }
  },[loading])


  const stateInfo = (state: "Waiting" | "Accepted" | "Declined")=>{
    switch(state){
      case "Waiting":
        return { color: "orange", text: "في انتظار الموافقة"};
      case "Accepted":
        return { color: "green", text: "تم الموافقة"};
      case "Declined":
        return { color: "red", text: "تم الرّفض"}
    }
  }
  return (
    <div className='flex flex-col gap-12'>
      <h1 className='text-6xl'>لوحة التحكّم</h1>
      {
        requests.map((req)=>(
          <Link href={`/admin/requests/${req._id}`}>
            <a className='bg-darkColor rounded-2xl w-1/2 p-4 text-lightColor text-2xl flex'>
              <div className='w-1/3 flex flex-col justify-center'>
                <div 
                  className="w-12 h-12 rounded-full" //circle
                  style={{backgroundColor: stateInfo(req.state).color}}
                ></div>
                <p>{stateInfo(req.state).text}</p>
              </div>
              <div>
                <p>{req.user.name}</p>
              </div>
            </a>
          </Link>  
        ))
      }
    </div>
  )
}

Requests.getLayout = function getLayout(page: ReactElement ) {
  return(
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
export default Requests