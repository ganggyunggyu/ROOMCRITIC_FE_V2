import React from 'react';
import { FaStar } from 'react-icons/fa';
type IconProps = {
  color: string;
};

const StarIcon: React.FC<IconProps> = ({ color }) => {
  return <FaStar className="w-14 h-14" color={color} size={24} />;
};

export default StarIcon;
