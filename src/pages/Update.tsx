import React from 'react';
import ResponsiveProvider from '../components/wrap-provider/ResponsiveProvider';
import UpdateForm from '../components/update/UpdateForm';
export default function Update() {
  return (
    <ResponsiveProvider direction='col' className='gap-5'>
      <UpdateForm />
    </ResponsiveProvider>
  );
}
