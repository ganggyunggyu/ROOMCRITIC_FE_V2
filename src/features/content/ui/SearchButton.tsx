import React from 'react';
import { Button } from '../../../shared/ui/button';

export const SearchButton = ({ label, isActive, onClick }) => {
  return <Button label={label} variant={isActive ? 'main' : 'disable'} onClick={onClick} />;
};
