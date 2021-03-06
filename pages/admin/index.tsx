import React, { ReactElement } from 'react'
import StatCardCont from '../../FrontEnd/components/admin/statCard';
import AdminLayout from '../../FrontEnd/Layouts/adminLayout';


const Admin = () => {

  return (
    <div className="dashboard flex flex-col gap-12">
      <h1 className='text-6xl'>لوحة التحكّم</h1>
      <StatCardCont />
    </div>
  )
}




Admin.getLayout = function getLayout(page: ReactElement ) {
  return(
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
export default Admin