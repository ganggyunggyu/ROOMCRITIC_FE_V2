import React from 'react';
import Button from '../atom-component/Button';

function SearchButton({ label, isActive, onClick }) {
  return <Button label={label} bg={isActive ? 'main' : 'disable'} onClick={onClick} />;
}

export default SearchButton;
