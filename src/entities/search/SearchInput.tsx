import React from 'react';
import Input from '../../shared/ui/Input';

function SearchInput({ label, value, onChange }) {
  return (
    <div className='w-2/3 relative'>
      <Input label={label} value={value} onChange={onChange} name={'search'} className='w-full' />
    </div>
  );
}

export default SearchInput;
