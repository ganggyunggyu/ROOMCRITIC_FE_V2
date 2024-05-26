import React from 'react';
import { Button } from '../../shared/ui/button/button';

export const SearchButton = ({ label, isActive, onClick }) => {
  return <Button label={label} bg={isActive ? 'main' : 'disable'} onClick={onClick} />;
};
