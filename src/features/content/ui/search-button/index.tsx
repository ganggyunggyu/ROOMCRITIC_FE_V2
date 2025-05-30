import { Button } from '@/shared';

export const SearchButton = ({ label, isActive, onClick }) => {
  return (
    <Button
      label={label}
      variant={isActive ? 'main' : 'disable'}
      onClick={onClick}
    />
  );
};
