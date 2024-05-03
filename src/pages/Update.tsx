import React from 'react';
import ResponsiveProvider from '../entities/wrap-provider/ResponsiveProvider';
import UpdateForm from '../entities/update/UpdateForm';
export default function Update() {
  return (
    <ResponsiveProvider direction='col' className='gap-5'>
      <UpdateForm />
    </ResponsiveProvider>
  );
}
