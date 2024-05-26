import React from 'react';
import ResponsiveProvider from '../ui/ResponsiveProvider';
import UpdateForm from '../../entities/update/UpdateForm';
export default function Update() {
  return (
    <ResponsiveProvider direction='col' className='gap-5 pt-10'>
      <UpdateForm />
    </ResponsiveProvider>
  );
}
