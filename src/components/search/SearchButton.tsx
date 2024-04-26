import React from 'react';
import Button from '../atom-component/Button';

function SearchButton({ label, isActive, onClick }) {
  return <Button label={label} bg={isActive ? 'main' : 'default'} onClick={onClick} />;
}

export default SearchButton;
